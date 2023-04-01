  import React, { useContext, useEffect, useState } from "react";
  import { Context } from "../store/appContext";
import "../../styles/logged.css";

export const Logged = () => {
  const { store, actions } = useContext(Context);
  const [userData, setUserData] = useState("");
  const token = localStorage.getItem("token");

  const getUser = async () => {
    const user = await actions.getUserData();
    setUserData(user);
  };

  useEffect(() => {
    store.token && store.token != "" && store.token != undefined && getUser();
  }, [store.token]);

  return (
    <div>
      {" "}
      {store.token && store.token != "" && store.token != undefined ? (
        <div className="center">
          <h1 className="video-title"> ¡Disney cumple 100 años!</h1>
          <iframe
            className="video-100"
            width="840"
            height="472.5"
            src="https://www.youtube.com/embed/035LEk9UGBY"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="center">
          <h2 className="must-be-loggued">Debes estar logueado para acceder a esta página</h2>
        </div>
      )}
    </div>
  );
};
