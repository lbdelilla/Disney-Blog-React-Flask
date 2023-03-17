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
        <div className="card">
          <img src={image} className="card__image" alt="a disney character" />
          <div className="card__overlay">
            <div className="card__header">
              <div className="card__header-text">
                <h3 className="card__title">{name}</h3>
              </div>
            </div>
            <div className="card__description">
              {films.length > 0 && (
                <div>
                  <span>Películas: {films}</span>
                </div>
              )}
              {shortFilms.length > 0 && (
                <div>
                  <span>Cortometrajes: {shortFilms}</span>
                </div>
              )}

              {tvShows.length > 0 && (
                <div>
                  <span>Programas de televisión: {tvShows}</span>
                </div>
              )}

              {videoGames.length > 0 && (
                <div>
                  <span>Videojuegos: {videoGames}</span>
                </div>
              )}
              {parkAttractions.length > 0 && (
                <div>
                  <span>Atracciones en parques: {parkAttractions}</span>
                </div>
              )}
              {allies.length > 0 && (
                <div>
                  <span>Aliados: {allies}</span>
                </div>
              )}
              {enemies.length > 0 && (
                <div>
                  <span>Enemigos: {enemies}</span>
                </div>
              )}

              {!films.length > 0 &&
                !shortFilms.length > 0 &&
                !tvShows.length > 0 &&
                !videoGames.length > 0 &&
                !parkAttractions.length > 0 &&
                !allies.length > 0 &&
                !enemies.length > 0 && (
                  <a
                    href={`https://www.google.com/search?q=${name}+disney`}
                    target="_blank"
                  
                  >
                    <button type="button" className="google-link btn">
                      + Información
                    </button>
                  </a>
                )}
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
};
