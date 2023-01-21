import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1 className="title">Welcome to the Cutie Zone!</h1>
		
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			
		</div>
	);
};
