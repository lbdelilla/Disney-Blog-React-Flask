import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const Logged = () => {

    // const { store, actions } = useContext(Context);
    // token = store.token
  
    useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3NDMwMDk0MywianRpIjoiZWE1ZjJkM2EtM2I0Mi00NDI1LThhZmMtZWVkYzJhNGI3ZWIxIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InRlc3RAdGVzdC5jb20iLCJuYmYiOjE2NzQzMDA5NDMsImV4cCI6MTY3NDMwMTg0M30.mYU9fRqE-rxtd8M3o_KJwkPdYbvX6LT3WZNU6IqX9D8"
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
