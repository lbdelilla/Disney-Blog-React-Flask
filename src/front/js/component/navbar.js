import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";
import mickey from "../../img/mickey-head.png"

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const handleClick =()=>{
		actions.logout()
		navigate('/')
	}
	return (
		<nav className=" navbar disney-navbar navbar-light ">
			<div>
			<img src={mickey} alt="a very cute pig picture of mickey mouse head" className="mickey"/>
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
					{(! store.token) ?
						(<Link to="/login">
							<button className="nav-btn btn">Ingresar</button>
						</Link>)
						
					: 
					<div className="loggued-nav">
						<Link to="/videos">
							<button className="nav-btn btn" disabled>Videos</button>
						</Link>
						<Link to="/games">
							<button className="nav-btn btn">Juegos</button>
						</Link>
						<button className="nav-btn btn"onClick={handleClick}>Cerrar Sesión</button>
					</div>
					}
				</div>
			</div>
		</nav>
	);
};
