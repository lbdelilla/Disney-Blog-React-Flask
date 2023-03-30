import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/characters.css";

import { Card } from "../component/card";
import { Navigation } from "../component/navigation";

export const Characters = () => {
  const { store, actions } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");
  const [searched, setSearched] = useState(false);
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  const characters = store.characters;
  const charactersData = characters?.data;

  const searchCharacters = async (name) => {
    try {
      const response = await fetch(
        `https://api.disneyapi.dev/character?name=${name}`
      );
      const data = await response.json();
      setFilteredCharacters(data.data);
      setSearched(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm !== "") {
      searchCharacters(searchTerm);
    } else {
      setFilteredCharacters([]);
      setSearched(true);
    }
  };

  return (
    <div className="card-container">
      <h1 className="page-title text-light text-center mt-5">
        Personajes del universo Disney
      </h1>
      <div className="nav-search-div">
        <div className="col">
          <Navigation />
        </div>
        <div className="container-fluid search-div col">
          <form
            className="d-flex justify-content-start"
            role="search"
            onSubmit={handleOnSubmit}
          >
            <input
              className="form-control me-2 search-input "
              type="search"
              placeholder="Escribe el nombre.."
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <button className="btn btn-outline-light search-btn" type="submit">
              Buscar
            </button>
          </form>
        </div>
      </div>

      <div className="row disney-cards justify-content-center">
        {searched
          ? filteredCharacters.map((character) => (
              <Card
                key={character.id}
                image={character.imageUrl}
                name={character.name}
                films={character.films}
                shortFilms={character.shortFilms}
                tvShows={character.tvShows}
                videoGames={character.videoGames}
                parkAttractions={character.parkAttractions}
                allies={character.allies}
                enemies={character.enemies}
              />
            ))
          : characters?.map((e, index) => (
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
            ))}
      </div>
      <div className="d-flex justify-content-center">
        <Navigation />
      </div>
    </div>
  );
};
