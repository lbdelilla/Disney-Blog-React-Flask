import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";
import mickey from "../../img/mickey-head.png";
import { FavoritesList } from "../component/favorites";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const location = useLocation(); // Obtener la ruta actual
  const isCharactersPage = location.pathname === "/characters"; // Comparar la ruta actual con "/characters"

  const favorites = store.favorites?.results
  console.log(favorites)

  const handleClick = () => {
    actions.logout();
    navigate("/");
  };
  return (
    <nav className=" navbar disney-navbar navbar-light ">
      <div>
        <img
          src={mickey}
          alt="a very cute pig picture of mickey mouse head"
          className="mickey"
        />
      </div>
      <div className="nav-container">
        <div className="ml-auto cont-nav">
          <div className="not-loggued-nav">
            <Link to="/">
              <button className="nav-btn btn">Inicio</button>
            </Link>
            <Link to="/characters">
              <button className="nav-btn btn">Personajes</button>
            </Link>
          </div>
          {!store.token ? (
            <Link to="/login">
              <button className="nav-btn btn">Ingresar</button>
            </Link>
          ) : (
            <div className="loggued-nav">
              <Link to="/videos">
                <button className="nav-btn btn" disabled>
                  Videos
                </button>
              </Link>
              <Link to="/games">
                <button className="nav-btn btn">Juegos</button>
              </Link>
              <button className="nav-btn btn" onClick={handleClick}>
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
	  {isCharactersPage && ( 
	  <div className="dropdown fav-btn">
            <button
              type="button"
              className="nav-item dropdown-toggle"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="badge rounded-pill bg-dark">
                {favorites?.length}
              </span>
              Favoritos
            </button>
            <FavoritesList />
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuButton1"
            >
              {/* <li>
                <a className="dropdown-item">test</a>
              </li> */}
            </ul>
          </div>
		      )}
    </nav>
  );
};
