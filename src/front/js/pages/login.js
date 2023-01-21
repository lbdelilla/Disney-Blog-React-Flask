import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
// import { useHistory } from "react-router-dom"; 
import "../../styles/login.css";
import littlepig from "../../img/littlepig.jpg";
import { Link } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const history = useHistory();
	const token = localStorage.getItem("token");

	const handleClick = () => {
		console.log(email, password);
		actions.login(email, password);
		console.log(token)
	}
 

	return (
		
				<div className="wrapper">
					<div className="logo">
						<img src={littlepig} alt="a very cut pig with winter clothes"/>
					</div>
					<div className="text-center mt-4 name">
						The Cutie Zone
					</div>
					{/* <form className="p-3 mt-3"> */}
						<div className="form-field d-flex align-items-center">
							<span className="far fa-user"></span>
							<input type="text" name="userName" id="userName" value={email} placeholder="Email" onChange={ (e) => setEmail(e.target.value)}/>
						</div>
						<div className="form-field d-flex align-items-center">
							<span className="fas fa-key"></span>
							<input type="password" name="password" id="pwd" value={password} placeholder="Password"onChange={ (e) => setPassword(e.target.value)}/>
						</div>
						<button className="btn mt-3" onClick={handleClick}>Login</button>
					{/* </form> */}
					<div className="text-center fs-6">
            			<Link to={"/sign_up"}>
							<span>Sign up</span>
						</Link>
        			</div>
				</div>
			
		
	);
};
