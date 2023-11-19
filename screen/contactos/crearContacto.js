import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { db } from '../../Data/Firebase';
import { estilos } from './estilos'
import base64 from 'react-native-base64';


//import { Contactos } from '../Contactos/ListadoContactos'


const ContactosForm = () => {
  const [img, setImg] = useState('');
  const [mail, setMail] = useState('');
  const [nombre, setNombre] = useState('');
  const [tel, setTel] = useState('');
  const [id, setId] = useState('');
  const [Guardado, setGuardado] = useState(false);

  const guardarEnFirebase = () => {

    setId(encripNombre(nombre))
    console.log(id);

    const datos = {
      img: img,
      email: mail,
      nombre: nombre,
      tel: tel,
      id: id,
    };   

    db.collection('contactos')
      .add(datos)
      .then(() => {
        setImg('')
        setMail('')
        setNombre('')
        setTel('')
        setId('')
        setGuardado(true)
        console.log('Datos guardados correctamente en Firestore');
        // Puedes restablecer los estados aquí si lo deseas
      })
      .catch((error) => {
        console.error('Error al guardar datos en Firestore:', error);
      });
  };


  const encripNombre=(sexo)=>{
    setNombre(sexo)
    setId(base64.encode(sexo))
  }

  const ocultarmensaje = () => {
    setGuardado(false);
  }
  return (
    <View style={estilos.ContenedorForm}>

<TextInput
        placeholder="id"
        value={id}
        editable={false}
        style={estilos.FormInput}
      />
        <View style={{ height: 20 }}></View>
    <TextInput
        placeholder="URL de la imagen"
        value={img}
        onChangeText={setImg}
        style={estilos.FormInput}
      />
      <View style={{ height: 20 }}></View>
      <TextInput
        placeholder="Correo electrónico"
        value={mail}
        onChangeText={setMail}
        style={estilos.FormInput}
      />
      <View style={{ height: 20 }}></View>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={(texto)=>{
          encripNombre(texto);
        }}
        style={estilos.FormInput}
      />
      <View style={{ height: 20 }}></View>
      <TextInput
        placeholder="Teléfono"
        value={tel}
        onChangeText={setTel}
        style={estilos.FormInput}
      />
      <View style={{ height: 20 }}></View>

      <TouchableOpacity
        style={estilos.botonGuardar}
        onPress={guardarEnFirebase}
      >
        <Text style={{ fontSize: 18 }}>
          Guardar
        </Text>
      </TouchableOpacity>
      <View style={{ height: 20 }}></View>
      {
        Guardado
          ?
          <View style={estilos.MensajeOperacion}>
            <Text style={{fontSize: 18}}>Se Guardo el contacto</Text>
            <TouchableOpacity
            style={estilos.botonGuardado}
            onPress={ocultarmensaje}
            >
              <Text>
                OK
              </Text>
            </TouchableOpacity>
          </View>
          :
          <Text></Text>
      }
    </View>
  );
}

export default function CrearContacto() {


  return (
    <View>
      <ContactosForm></ContactosForm>
    </View>
  )
}