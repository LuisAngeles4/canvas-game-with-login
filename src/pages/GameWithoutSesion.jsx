import React from 'react'
import GameScript from '../components/GameScript.jsx';
import Footer from '../components/Footer.jsx';
import {useNavigate } from 'react-router-dom'

export const GameWithoutSesion = () => {
  const navigate = useNavigate();
  const goToInicio = (e) => {
    navigate("/login")
}
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className='container-fluid'>
        <a className='navbar-brand'>Bienvenido! Invitado</a>
        <form className='d-flex'>
            <button class="btn btn-light" onClick={goToInicio}>Ir a inicio</button>
          </form>
        </div>
      </nav> 

<GameScript/>
<Footer />
    </div>
    
  )
}

export default GameWithoutSesion