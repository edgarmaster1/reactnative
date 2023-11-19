import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { estilos } from './estilos';
import {db}  from '../../Data/Firebase'

export default function editarContacto({route}) {

    const {contactoEditar}= route.params;

  

    const ContactosForm = () => {
        const [img, setImg] = useState(contactoEditar.Img);
        const [mail, setMail] = useState(contactoEditar.email);
        const [nombre, setNombre] = useState(contactoEditar.nombre);
        const [tel, setTel] = useState(contactoEditar.tel);
        const [Guardado, setGuardado] = useState(false);
        const [idContacto]=useState(contactoEditar.id)
      
        const guardarEnFirebase = () => {
          const datos = {
            img: img,
            email: mail,
            nombre: nombre,
            tel: tel,
            id:idContacto,
          };
            const Ref = db.collection('contactos')
            const DocEditar = Ref.doc(contactoEditar.documentID)
           
           
            DocEditar.update(datos)
            .then(()=>{
              setGuardado(true)
            })
            .catch((e) =>{
              console.log(e);
            })

        };


        const ocultarmensaje = () => {
          setGuardado(false);
        }
      
        return (
          <View style={estilos.ContenedorForm}>
      
      
      
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
              onChangeText={setNombre}
              style={estilos.FormInput}
            />
            <View style={{ height: 20 }}></View>
            <TextInput
              placeholder="Teléfono"
              value={tel.toString()}
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


    return (


    <View>
      <ContactosForm></ContactosForm>
    </View>

  )
}