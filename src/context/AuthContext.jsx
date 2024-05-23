import { createContext, useContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, signInWithPopup,  signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from "../api/firebase.config"

import React from 'react'

const AuthContext = createContext();
export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const googleSignIn = async (e) => {
        
        const provider = new GoogleAuthProvider();
        await
        signInWithPopup(auth, provider)
        .then((result) => {
            e.preventDefault();
          console.log("Logged In", result);
        })
        .catch((error) => {
          console.log("Caught error Popup closed", error);
        });
        
    };

    const logOut = () => {
        signOut(auth);
    }

    useEffect(() => {
        const onsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("User", currentUser);
        });
        return () => {
            onsubscribe();
        };
    }, []);
    return (
        <AuthContext.Provider value={{googleSignIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    );

};

export const UserAuth = () => {
    return useContext(AuthContext);
};