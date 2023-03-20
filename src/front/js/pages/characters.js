import React, { useContext } from "react";
// import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/characters.css";

import { Card } from "../component/card";
import { Navigation } from "../component/navigation";

export const Characters = () => {
  const { store, actions } = useContext(Context);

  const characters = store.characters;
  console.log(characters)
  const charactersData = characters?.data
  console.log(charactersData)
 

  return (
    <div className="card-container">
      <h1 className="page-title text-light text-center mt-5">Personajes del universo Disney</h1>
      <div>
        <Navigation />
      </div>
      <div className="row disney-cards justify-content-center">
        {characters?.map((e, index) => {
          return (
            <Card
              key={e.id}
              image={e.imageUrl}
              name={e.name}
              films={e.films}
              shortFilms={e.shortFilms}
              tvShows={e.tvShows}
              videoGames={e.videoGames}
              parkAttractions={e.parkAttractions}
              allies={e.allies}
              enemies={e.enemies}
            />
          );
        })}
      </div>
      <div>
        <Navigation />
      </div>
    </div>
  );
};
