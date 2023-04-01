import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/card.css";

import { HeartIcon } from "../component/heartIcon";
import { HeartFillIcon } from "../component/heartIcon";

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
}) => {
 
  const { store, actions } = useContext(Context);
  const [favoriteCharacters, setFavoriteCharacters] = useState({});

  useEffect(() => {
    if (store.favorites.length > 0) {
      const favorites = store.favorites.reduce(
        (acc, { id }) => ({ ...acc, [id]: true }),
        {}
      );
      setFavoriteCharacters(favorites);
    }
  }, [store.favorites]);


  const handleFavorites = (id, name) => {
    const isFavorite = favoriteCharacters[id];
    const obj = {id, name };
  
    if (isFavorite) {
      const { [id]: _, ...newFavoriteCharacters } = favoriteCharacters;
      setFavoriteCharacters(newFavoriteCharacters);
      actions.deleteFavorites(name, id);
    } else {
      setFavoriteCharacters({ ...favoriteCharacters, [id]: true });
      actions.setFavorites(obj);
      console.log(obj)
    }
  };

  return (
    <ul className="cards" key={id}>
      <li>
        <div className="card">
          <button
            className="favorites-icon"
            onClick={() => handleFavorites(id, name)}
          >
             {favoriteCharacters[id] ? <HeartFillIcon /> : <HeartIcon />}
          </button>
          <img src={image} className="card__image" alt="a disney character" />
          <div className="card__overlay">
            <div className="card__header">
              <div className="card__header-text">
                <h3 className="card__title">{name}</h3>
              </div>
            </div>
            <div className="card_content">
              <div className="card__description">
                {films.length > 0 && (
                  <div>
                    <span>Películas: {films.slice(0, 1)}</span>
                  </div>
                )}
                {shortFilms.length > 0 && (
                  <div>
                    <span>Cortometrajes: {shortFilms.slice(0, 1)}</span>
                  </div>
                )}

                {tvShows.length > 0 && (
                  <div>
                    <span>Programas de televisión: {tvShows.slice(0, 1)}</span>
                  </div>
                )}

                {videoGames.length > 0 && (
                  <div>
                    <span>Videojuegos: {videoGames.slice(0, 1)}</span>
                  </div>
                )}
                {parkAttractions.length > 0 && (
                  <div>
                    <span>
                      Atracciones en parques: {parkAttractions.slice(0, 1)}
                    </span>
                  </div>
                )}
                {allies.length > 0 && (
                  <div>
                    <span>Aliados: {allies.slice(0, 1)}</span>
                  </div>
                )}
                {enemies.length > 0 && (
                  <div>
                    <span>Enemigos: {enemies.slice(0, 1)}</span>
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
        </div>
      </li>
    </ul>
  );
};
