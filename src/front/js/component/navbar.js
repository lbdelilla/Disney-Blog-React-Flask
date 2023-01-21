import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import littlepig from "../../img/littlepig.jpg"

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light ">
			<div>
			<img src={littlepig} alt="a very cute pig with winter clothes" className="piggy"/>
			</div>
			<div className="container">
				
				{/* <Link to="/">
					<span className="brand navbar-brand">The Cutie Zone</span>
				</Link> */}
				<div className="ml-auto">
				<Link to="/">
						<button className="btn">Home</button>
					</Link>
					<Link to="/login">
						<button className="btn">Login</button>
					</Link>
					
				</div>
			</div>
		</nav>
	);
};
