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
        
      </div>
    ) : (
      <div className="center">
        <h2>Debes estar logueado para acceder a esta página</h2>
      </div>
    )}
    </div> 
    )
};
