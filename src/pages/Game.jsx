import React, {useState, useEffect} from 'react'
import { UserAuth } from '../context/AuthContext'
import { collection, query, orderBy, limit, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import GameScript from '../components/GameScript.jsx';
import { orderByPriority } from 'firebase/database';
import { db } from '../api/firebase.config.jsx';
import "../pages/Game.css"
import Footer from '../components/Footer.jsx';

export const Game = () => {
  const {user, logOut} = UserAuth();
  const [highScore, setHighScore] = useState(0);
  const cerrarSesiom = async() => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const q = query(collection(db, `scores-${user.email}`), orderBy("score", "desc"), limit(1));

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const highScoreData = QuerySnapshot.docs.map(doc => doc.data());
      if(highScoreData.length > 0) {
        setHighScore(highScoreData[0].score);
      }
    });
    return () => unsubscribe();
  }, []);

  
  
  return (
    <div>
     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className='container-fluid'>
        <a className='navbar-brand'>Bienvenido! {user.displayName}</a>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <a className='nav-link active'> 
                Tu puntuación más alta es: {highScore}
              </a>
            </li>
            
          </ul>
          
          </div>
          <form className='d-flex'>
            <button className="btn btn-light" onClick={cerrarSesiom}>Cerrar Sesión</button>
          </form>
        </div>
      </nav> 
      <GameScript />  
      <Footer />
    </div>
  )
}

export default Game


