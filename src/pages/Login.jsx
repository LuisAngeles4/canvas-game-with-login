import React, { useEffect, useState } from 'react'
import Imagen from "../assets/login-img.jpg"
import ImageProfile from "../assets/profile-img.jpg"
import { UserAuth } from '../context/AuthContext'
import {useNavigate } from 'react-router-dom'




export const Login = () => {
    const navigate = useNavigate();
    const {user, googleSignIn} = UserAuth();
    const iniciar = async(e)=> {
        e.preventDefault();
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    }

    const jugarSinLogin = (e) => {
        navigate("/gameWithoutSesion")
    }

    useEffect(() => {
        if(user != null){
            navigate("/")
        }

    }, [user])

    return(
        <div className='container'>
        <div className="row">
            {/* Columna formulario */}
            <div className="col-md-4">
                <div className="padre">
                    <div className="card card-body shadow-dark">
                        <img src={ImageProfile} className='estilo-profile' />
                        <form>
                            <button onClick={iniciar} className='btnform'>Inicia sesión con Google!</button>
                            <button onClick={jugarSinLogin} className='btnform'>Jugar sin cuenta</button>
                        </form>
                        <h4 className='texto'>
                           
                                
                        </h4>
                    </div>
                </div>
            </div>
            {/* Columna más grande */}
            <div className="col-md-8 ">
                <img src={Imagen} className="tamaño-imagen" />
            </div>
        </div>
    </div>
  )
}

export default Login

    

