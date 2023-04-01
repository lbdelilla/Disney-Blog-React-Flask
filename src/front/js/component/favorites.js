import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const FavoritesList = () => {
  const { store, actions } = useContext(Context);

  const favorites = store.favorites?.results;
  console.log(favorites);
  const user_id = sessionStorage.getItem("user_id");
  useEffect(() => {
    actions.getUserFavorites(user_id);
  }, []);

  const handleDelete = (name, id) => {
    actions.deleteFavorites(name, id);
  };

  return (
    <ul className="dropdown-menu dropdown-menu-ligth dropdown-menu-end">
      {/* {!favorites.length && (
        <li className="dropdown-item">Add your favorites</li>
      )} */}
      {favorites && favorites?.length > 0 ? (
        favorites.map((favorite) => (
          <li
            key={favorite.fav_id}
            className="dropdown-item d-flex justify-content-between align-items-center"
          >
            <span>{favorite.fav_name}</span>
            <i
              className="fa-solid fa-trash"
              onClick={() => handleDelete(favorite.fav_name, favorite.fav_id)}
            ></i>
          </li>
        ))
      ) : (
        <li className="dropdown-item">Add your favorites</li>
      )}
    </ul>
  );
};
