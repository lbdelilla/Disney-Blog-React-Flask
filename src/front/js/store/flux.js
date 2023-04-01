const BACKEND_URL = process.env.BACKEND_URL

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      user_id : null,
      characters: [],
      favorites: [],
      next: "",
      prev: "",
    },
    actions: {
 
      synctoken: () => {
        const token = localStorage.getItem("token");
        console.log("App just loaded, synching the local storage");
        if (token && token != "" && token != undefined)
          setStore({ token: token });
      },

      login: async (email, password) => {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(`${BACKEND_URL}/api/login`, requestOptions);
          if (resp.status != 200) {
            console.log("An error has occurred");
            return false;
          }
          const data = await resp.json();
          localStorage.setItem("token", data.access_token);
          sessionStorage.setItem("user_id", data.user_id);
          console.log(data.user_id)
          setStore({ token: data.access_token, user_id: data.user_id });
         
      
          return true;
        } catch (error) {
          console.error("There has been an error logging in");
        }
      },
      
      register: async (email, password) => {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(
            `${BACKEND_URL}/api/register`,
            requestOptions
          );
          if (resp.status != 200) {
            alert("An error has occurred while creating the user");
            return false;
          }
          const data = await resp.json();
          console.log(data);

          return true;
        } catch (error) {
          console.error("There has been an error creating a user");
        }
      },

      getUserData: async () => {
        const store = getStore();
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        };
        try {
          const res = await fetch(
            `${BACKEND_URL}/api/private`,
            requestOptions
          );
          const data = await res.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },

      logout: () => {
        const token = localStorage.removeItem("token");
        setStore({ token: null });
      },
	    getCharacters: async () => {
			const response = await fetch(
			  `https://api.disneyapi.dev/characters`,
			  {
				method: "GET",
			  }
			);
			const data = await response.json();
			setStore({ characters: data.data, next: data.nextPage });
    
		},
		  setCharacters: (data) => {
			setStore({
			  characters: data.data,
			  next: data.nextPage,
			  prev: data.previousPage,
			});
        console.log(data.data)
		  },
		  // setFavorites: (data) => {
			// setStore({ favorites: getStore().favorites.concat(data) });
			// console.log(getStore);
		  // },
	
		  // deleteFavorites: (name) => {
			// setStore({
			//   favorites: getStore().favorites.filter(
			// 	(favorites) => favorites.name !== name
			//   ),
			// });
		  // },

      getUserFavorites: async (user_id) => {
        const token = localStorage.getItem('token');
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }
        try {
            const response = await fetch(`${BACKEND_URL}/api/favorites/${user_id}`, requestOptions);
    
            if (response.status !== 200) {
                console.log("An error has occurred");
                return false;
            }
    
            const data = await response.json();
    
            setStore({...getStore(), favorites: data });
        } catch (error) {
            console.error(error);
        }

      },
      setFavorites: async (data) => {
        const token = localStorage.getItem('token');
        const user_id = JSON.parse(sessionStorage.getItem("user_id"));
        
        const store = getStore();
        const existingFavorites = store.favorites;
        console.log(existingFavorites)
        const existingFavorite = existingFavorites.find(favorite => favorite.fav_id === data.id);
        if (existingFavorite) {
          console.log(`${existingFavorite.name} ya está en favoritos`);
          return;
        }
        
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            fav_name: data.name,
            fav_id: data.id,
            user_id: user_id
          })
        };
        
        try {
          const response = await fetch((`${BACKEND_URL}/api/favorites`), requestOptions);
          if (response.status !== 200) {
            console.log("Ha ocurrido un error");
            return false;
          }
          const result = await response.json();
          setStore({ ...getStore(),  favorites: existingFavorites.concat(data) })
        } catch (error) {
          console.error(error);
        }
      },
      
      deleteFavorites: async (id) => {
        try {
          const response = await fetch(`${BACKEND_URL}/api/favorites/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const result = await response.json();
          console.log(result);
          setStore({
            favorites: getStore().favorites.filter(favorites => favorites.fav_id !== id)
          });
        } catch (error) {
          console.error(error);
        }
      },
            
		},
	  };
	};
	

export default getState;
