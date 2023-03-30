import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/register.css";
import daisy from "../../img/daisy-duck-face.png"



export const Register = ()=>{
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate("");

    const handleClick = async () =>{
        try {
            const registerSuccesful = await actions.register(email, password);
            if (registerSuccesful) {
              navigate("/login");
            } else {
              setError("Ha ocurrido un error con el registro. Por favor revisa los campos he inténtalo de nuevo");
            }
          } catch (error) {
            console.log(error);
            setError("Ocurrió un error con el registro. Por favor, inténtalo de nuevo.");
          }
        };

    return (
        <div className="wrapper">
            <div className="logo">
                <img src={daisy} alt="a very cut pig with winter clothes" />
            </div>
            <div className="text-center mt-4 name">
                ¡Regístrate!
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
            {error && <div className="text-danger text-center mt-3">{error}</div>}
            &nbsp; 
            <div className="disclaimer text-center mt-4" >
               Luego del registro serás redirigido al ingreso.
            </div>
    </div>
    )
}