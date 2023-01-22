import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/logged.css";
import monster from "../../img/monster2.png"

export const Logged = () => {

    const [userData, setUserData] = useState("")
    const token = localStorage.getItem("token");

    const getData = async () => {
      let headersList = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
  
      let response = await fetch(
        "https://3001-lbdelilla-reactjwtauthe-wqej54reyb8.ws-eu83.gitpod.io/api/private",
        {
          headers: headersList,
        }
      );
  
      let data = await response.json();
    
      setUserData(data);
    };
      
    useEffect(() => {
      getData();
    }, []);

    !token ?? navigate("/login") 
    return (
    <div className="center">
      <h1 >You are in The Cutie Zone </h1>
      <h4> Press log out if there´s to much cuteness for you!</h4>
      <img className="monster2" src={monster} alt="a very cute monster"/> 
    </div>
    )
};
