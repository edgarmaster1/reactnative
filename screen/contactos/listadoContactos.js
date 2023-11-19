import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity,RefreshControl,Image} from 'react-native';
import { db } from '../../Data/Firebase';
import { useNavigation } from '@react-navigation/native';
import { estilos } from '../contactos/estilos';

export default function listadoContactos() {
  const Navegacion = useNavigation()
  const [contactos, setContactos] = useState([]);
  const [cargando, setcargando] = useState(true);

  const obtenerContactos = async () => {
    try {

      const contactosRef = db.collection('contactos');
      const snapshot = await contactosRef.get();
      const ContactosData = snapshot.docs.map((doc) => ({
        documentID:doc.id,
        ...doc.data()

      }));
        console.log(ContactosData);
      setContactos(ContactosData);
      setcargando(false);
    } catch (error) {
      console.error('Error al obtener los contactos', error);
    }
  };

    useEffect(() => {
        obtenerContactos();
      }, []);

      
      
      const Listado = ({ item }) => (
        <View style={estilos.Contenedor}>
          <TouchableOpacity onPress={() => {
            console.log('Seleccionado ' + item.nombre);
            Navegacion.navigate('Detalles', { persona: item });
          }}>  
          <View style={estilos.Row}>
              <View>
                <Image
                  source={{ uri: item.Img }}
                  style={estilos.PerfilImage}
                />
              </View>
              <View style={estilos.RayaVert}></View>
              <View style={estilos.infoContacto}>
                <Text style={estilos.NombreContacto}>{item.nombre}</Text>
                <Text>{item.tel}</Text>
                <Text>{item.email}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
    
      )
    




  return (

    <View>
      <FlatList
        data={contactos}
        keyExtractor={(contacto) => contacto.tel}
        style={estilos.Lista}
        renderItem= {Listado}
        ItemSeparatorComponent={<View style={{ height: 10, backgroundColor: 'white'}} />}
        refreshControl={
          <RefreshControl refreshing={cargando} onRefresh={obtenerContactos}></RefreshControl>
        }
      />         
    </View>

  )
}



