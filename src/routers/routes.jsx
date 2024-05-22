import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Game } from "../pages/Game";
import { Login } from "../pages/Login";
import { GameWithoutSesion } from "../pages/GameWithoutSesion";
import { UserAuth } from "../context/AuthContext";


export function MyRoutes() {
    const {user} = UserAuth();

    const RequireAuth = ({children}) => {
        return user ? children :  <Navigate to= {"/login"} />;
    }
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RequireAuth>
                        <Game/>  
                    </RequireAuth>}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/gameWithoutSesion" element={<GameWithoutSesion/>}> /</Route>

            </Routes>
        </BrowserRouter>
    );
    
}