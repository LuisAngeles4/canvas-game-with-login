import { createContext, useContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from "../api/firebase.config"

import React from 'react'

const AuthContext = createContext();
export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
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