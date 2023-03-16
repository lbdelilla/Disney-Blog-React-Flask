import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/card.css";

export const Card = ({
  name,
  image,
  films,
  shortFilms,
  tvShows,
  videoGames,
  parkAttractions,
  allies,
  enemies,
  id,
  key,
}) => {
  const { store, actions } = useContext(Context);

  const favorites = store.favorites;
  const characters = store.characters;

  const handleFavorites = (id, name) => {
    const obj = [{ id, name }];
    favorites.some((characters) => characters.name === obj[0].name)
      ? null
      : actions.setFavorites(obj);
  };

  return (
    <ul className="cards" key={key}>
      <li>
        <a href="" className="card">
          <img src={image} className="card__image" alt="a disney character" />
          <div className="card__overlay">
            <div className="card__header">
              <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
                <path />
              </svg>

              <div className="card__header-text">
                <h3 className="card__title">{name}</h3>
              </div>
            </div>
            <p className="card__description">
              {films.length > 0 && <span>spanelículas: {films}</span>}
              {shortFilms.length > 0 && <span>Cortometrajes: {shortFilms}</span>}
              {tvShows.length > 0 && <span>spanrogramas de televisión: {tvShows}</span>}
              {videoGames.length > 0 && <span>Videojuegos: {videoGames}</span>}
              {parkAttractions.length > 0 && (
                <span>Atracciones en parques: {parkAttractions}</span>
              )}
              {allies.length > 0 && <span>Aliados: {allies}</span>}
              {enemies.length > 0 && <span>Enemigos: {enemies}</span>}
              {!films.length > 0 &&
                !shortFilms.length > 0 &&
                !tvShows.length > 0 &&
                !videoGames.length > 0 &&
                !parkAttractions.length > 0 &&
                !allies.length > 0  &&
                !enemies.length > 0 && (
                <Link to={`https://www.google.com/search?q=${name}+disney`} target="_blank">
                  <button className="google-link btn" >
                    Buscar información sobre {name} en Google
                  </button>
                </Link>  
                )}
            </p>
          </div>
        </a>
      </li>
    </ul>
  );
};
