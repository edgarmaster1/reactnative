import React, { useEffect } from 'react'
import Navigation from './navegation';
import { StatusBar } from 'react-native';

export default function App(){
  useEffect(() => {
    // Cambia el color de la barra de estado
    StatusBar.setBackgroundColor('lightyellow'); 
  }, []);

  return (
    <Navigation>
    </Navigation>
  );
}