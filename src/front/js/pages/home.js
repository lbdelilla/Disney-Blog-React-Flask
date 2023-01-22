import React from "react";

import monster from "../../img/monster.png";

import "../../styles/home.css";

export const Home = () => {
	
	return (
	
		<div className="homebg text-center mt-5">	
			<h1 className="title">Welcome to the Cutie Zone!</h1>
			<h4> Press login to star you cutie journey !</h4>
			<img className="monster-bg" src={monster} alt="cute monster"/>			
		</div>
	);
};
