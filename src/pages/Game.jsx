
import React from 'react'
import { UserAuth } from '../context/AuthContext'
import GameScript from '../components/GameScript.jsx';

export const Game = () => {
  const {user, logOut} = UserAuth();
  const cerrarSesiom = async() => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  }
  



  return (
    
    <div>
      <h1>GAME</h1>
      <h1>Bienvenido {user.displayName}</h1>
      <GameScript />
      
      <button onClick={cerrarSesiom}>Cerrar Sesión</button>
      
    </div>
  )
}

export default Game


