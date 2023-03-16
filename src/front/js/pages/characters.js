import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
// import "../../styles/demo.css";

import { Card } from "../component/card";
// import { Navigation } from "../component/Navigation.jsx";

export const Characters = () => {
  const { store, actions } = useContext(Context);

  const characters = store.characters;
  const charactersData = characters?.data
  console.log(charactersData)
 

  return (
    <div className="card-container">
      <h1 className="page-title text-light text-center">Personajes del universo Disney</h1>
      <div>
        {/* <Navigation /> */}
      </div>
      <div className="row disney-cards justify-content-center">
        {charactersData?.map((e) => {
          return (
            <Card
              key={e.id}
              image={e.imageUrl}
              name={e.name}
              films={e.films}
              shortFilms={e.shortFilms}
              tvShows={e.tvShows}
              id={e.id}
              videoGames={e.videoGames}
              parkAttractions={e.parkAttractions}
              allies={e.allies}
              enemies={e.enemies}
            />
          );
        })}
      </div>
      <div>
        {/* <Navigation /> */}
      </div>
    </div>
  );
};
