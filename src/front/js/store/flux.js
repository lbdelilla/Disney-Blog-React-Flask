const BACKEND_URL = process.env.BACKEND_URL

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
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
          const resp = await fetch(
            "https://3001-lbdelilla-reactjwtauthe-d0j77k9fs9n.ws-eu90.gitpod.io/api/login",
            requestOptions
          );
          if (resp.status != 200) {
            alert("An error has occurred");
            return false;
          }
          const data = await resp.json();
          localStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });

          return true;
        } catch (error) {
          console.error("There has been an error login in");
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
            "https://3001-lbdelilla-reactjwtauthe-d0j77k9fs9n.ws-eu90.gitpod.io/api/register",
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
            "https://3001-lbdelilla-reactjwtauthe-d0j77k9fs9n.ws-eu90.gitpod.io/api/private",
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
			  console.log(data)
			setStore({ characters: data, next: data.nextPage });
		},
		  setCharacters: (data) => {
			setStore({
			  characters: data.results,
			  next: data.nextPage,
			  prev: data.previousPage,
			});
		  },
		  setFavorites: (data) => {
			setStore({ favorites: getStore().favorites.concat(data) });
			console.log(getStore);
		  },
	
		  deleteFavorites: (name) => {
			setStore({
			  favorites: getStore().favorites.filter(
				(favorites) => favorites.name !== name
			  ),
			});
		  },
		},
	  };
	};
	

export default getState;
