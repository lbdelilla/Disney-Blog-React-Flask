import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/register.css";
import daisy from "../../img/daisy-duck-face.png"



export const Register = ()=>{
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate("");

    const handleClick = () =>{
        actions.register(email,password);
        navigate("/login")
    }

    return (
        <div className="wrapper">
            <div className="logo">
                <img src={daisy} alt="a very cut pig with winter clothes" />
            </div>
            <div className="text-center mt-4 name">
                ¡Registrate!
            </div>
            <div className="form-field d-flex align-items-center">
                <span className="far fa-user"></span>
                <input type="text" name="userName" id="userName" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
            </div>
            <div className="form-field d-flex align-items-center">
                <span className="fas fa-key"></span>
                <input type="password" name="password" id="pwd" placeholder="Contraseña" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <button className="btn mt-3" onClick={handleClick} >Registro</button>
            &nbsp; 
            <div className="disclaimer text-center mt-4" >
               Luego del registro serás redirigido al ingreso.
            </div>
    </div>
    )
}