import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import minnie from "../../img/minnie-face.png";
import { Link } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    actions.login(email, password);
    navigate("/private");
  };

  return (
    <div className="wrapper">
      <div className="logo">
        <img src={minnie} alt="a very cut pig with winter clothes" />
      </div>
      <div className="text-center mt-4 name">¡Ingresa y accede a contenido exclusivo!</div>
      <div className="form-field d-flex align-items-center">
        <span className="far fa-user"></span>
        <input
          type="text"
          name="userName"
          id="userName"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-field d-flex align-items-center">
        <span className="fas fa-key"></span>
        <input
          type="password"
          name="password"
          id="pwd"
          value={password}
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn mt-3" onClick={handleClick}>
        Ingresar
      </button>
      <div className="text-center fs-6">
      &nbsp;
        <div> 
          <Link to={"/register"}>
            <span className="register">Registrate aquí</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
