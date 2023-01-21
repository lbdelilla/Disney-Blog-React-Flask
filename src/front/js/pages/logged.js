import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const Logged = () => {

    // const { store, actions } = useContext(Context);
    // token = store.token
  
    useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3NDMwMTM5MywianRpIjoiNmE0ODgwOWEtMjliMy00YzRkLTg0YjUtNzhhZjYxNGI5NzU1IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InRlc3RAdGVzdC5jb20iLCJuYmYiOjE2NzQzMDEzOTMsImV4cCI6MTY3NDMwMjI5M30.NyyDotENzKCDtB243Z4xXZX5D2J-oh6oxK4QRv1Skvs"
    );

    var raw = "";

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://3001-lbdelilla-reactjwtauthe-wqej54reyb8.ws-eu83.gitpod.io/api/private",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  });

  return (
    <div>
      <p>You are in The Cutie Zone</p>
    </div>
  );
};
