import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

//iconos
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

//vistas 
import aboutscreen from './screen/aboutscreen';
import home from './screen/home';
import listadoContactos from './screen/contactos/listadoContactos';
import Editar from './screen/contactos/editarContacto'
import addContacto from './screen/contactos/crearContacto';


import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DetallesContacto from './screen/contactos/DetallesContacto';


//objeto bottom 
const tab = createBottomTabNavigator(
)

const listadoStack = createNativeStackNavigator();

function Contactosstack(){
        return (
        <listadoStack.Navigator
            initialRouteName='Contactos'
        >
            <listadoStack.Screen
            name='Contactos'
            component={listadoContactos}
            options={{
                headerTitleAlign: 'center',
                headerTitleStyle: { fontWeight: 'bold' },
            }}
            />
            <listadoStack.Screen
            name='Detalles'
            component={DetallesContacto}
            />
            <listadoStack.Screen
            name='Editar'
            component={Editar}
            />
        </listadoStack.Navigator>
        )
        }








function MyTabs(){
    return(
        <tab.Navigator
        initialRouteName='home'
        screenOptions={{
            tabBarActiveTintColor:'blue',
        }}>
            <tab.Screen 
            name='home'
             component={home} 
             options={{tabBarIcon:({color})=>(
            <FontAwesome name="home" 
            size={30} color={color} />
            )
            }}/>


            <tab.Screen
             name='añadir' 
             component={addContacto} 
             options= {{tabBarIcon:({color})=>(
            <AntDesign name="circledown"
             size={30} color={color} />
            )}}/>
            
            <tab.Screen
             name='listado'
              component={Contactosstack} 
              options= {{tabBarIcon:({color})=>(
            <Entypo name="list" size={24} color={color} />

            ),
            headerShown:false,
            }}/>
        </tab.Navigator>
    )
}

export default function Navigation(){
    return(
        <NavigationContainer>
            <MyTabs></MyTabs>
        </NavigationContainer>
    )
}