import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/logged.css";
import monster from "../../img/monster2.png"
import monster5 from "../../img/monster5.png"

export const Logged = () => {
    const { store, actions } = useContext(Context);
    const [userData, setUserData] = useState("")
    const token = localStorage.getItem("token");

    const getUser = async () => {
      const user = await actions.getUserData();
      setUserData(user);
    };
      
    useEffect(() => {
      store.token && store.token != "" && store.token != undefined && getUser();
    }, [store.token]);

    
    return (
    <div> {store.token && store.token != "" && store.token != undefined ? (
      <div className="center">
        <h1 >You are in The Cutie Zone </h1>
        <h4> Press log out if there´s to much cuteness for you!</h4>
        <img className="monster2" src={monster} alt="a very cute monster"/> 
      </div>
    ) : (
      <div className="center">
        <h2>You need to login or register to enter the cutie zone</h2>
        <img className="monster5" src={monster5} alt="a very cute green monster"/>
      </div>
    )}
    </div> 
    )
};
