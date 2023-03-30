import React from "react";
import "../../styles/home.css";
import { Castle } from "../component/castle";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="homebg text-center mt-1">
      <h1 className="title">¡Bienvenido a Disney Fun & Games!</h1>
      <div className="pyro">
        <div className="before"></div>
        <div className="after"></div>
      </div>
      <Link to="/register">
        <button type="button" className="btn start-btn btn-white btn-animate">
          Comenzar
        </button>
      </Link>
     
      <div>
        <Castle />
      </div>
    </div>
  );
};
