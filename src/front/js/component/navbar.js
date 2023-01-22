import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";
import monster from "../../img/monster4.png"

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const handleClick =()=>{
		actions.logout()
		navigate('/')
	}
	return (
		<nav className="navbar navbar-light ">
			<div>
			<img src={monster} alt="a very cute pig with winter clothes" className="piggy"/>
			</div>
			<div className="container">
				<div className="ml-auto">
					<Link to="/">
						<button className="btn">Home</button>
					</Link>
					{! store.token ?
						<Link to="/login">
							<button className="btn">Login</button>
						</Link>
					: 
						<button className="btn"onClick={handleClick}>Log out</button>
					}
				</div>
			</div>
		</nav>
	);
};
