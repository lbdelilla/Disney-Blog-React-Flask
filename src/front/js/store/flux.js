const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token : null,
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			synctoken : () =>{
				const token = localStorage.getItem("token");
				console.log("App just loaded, synching the local storage");
				if (token && token != "" && token != undefined) setStore({token: token}); 
			},	


			login: async (email, password) => {
				
					const opts = {
						method : "POST",
						headers : {
							"Content-type": "application/json"
						},
						body : JSON.stringify({
							email : email,
							password : password
						})
					};
					try {
						const resp = await fetch("https://3001-lbdelilla-reactjwtauthe-wqej54reyb8.ws-eu83.gitpod.io/api/login", opts)
						if (resp.status != 200){
							alert("An error has occurred");
							return false;
						} 
						const data = await resp.json();						
						localStorage.setItem("token", data.access_token);
						setStore({token: data.access_token})

						return true;
					}
					catch(error){
						console.error("There has been an error login in")
					}
			},

			register: async (email, password)=>{
				const opts = {
					method : "POST",
					headers : {
						"Content-type": "application/json"
					},
					body : JSON.stringify({
						email : email,
						password : password
					})
				};
				try {
					const resp = await fetch("https://3001-lbdelilla-reactjwtauthe-wqej54reyb8.ws-eu83.gitpod.io/api/register", opts)
					if (resp.status != 200){
						alert("An error has occurred while creating the user");
						return false;
					} 
					const data = await resp.json();	
					console.log(data);					

					return true;
				}
				catch(error){
					console.error("There has been an error creating a user")
				}
			},
			
			logout: ()=>{
				const token = localStorage.removeItem("token");
				console.log("Logged out");
				setStore({token:null}); 
			},


		}
	};
};

export default getState;
