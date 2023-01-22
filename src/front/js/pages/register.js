import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/register.css";
import monster4 from "../../img/monster4.png"



export const Register = ()=>{
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
                <img src={monster4} alt="a very cut pig with winter clothes" />
            </div>
            <div className="text-center mt-4 name">
                Sign up to be a cutie!
            </div>
            <div className="form-field d-flex align-items-center">
                <span className="far fa-user"></span>
                <input type="text" name="userName" id="userName" placeholder="Username" value={email} onChange={(e)=> setEmail(e.target.value)} />
            </div>
            <div className="form-field d-flex align-items-center">
                <span className="fas fa-key"></span>
                <input type="password" name="password" id="pwd" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <button className="btn mt-3" onClick={handleClick} >Register</button>
    </div>
    )
}