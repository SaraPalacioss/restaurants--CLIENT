import React, { useContext, useState, createContext } from 'react';
import userService from '../services/user.service';
import restaurantsService from '../services/restaurants.service';

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {

  // user states

  const [loggedIn, setLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [authToken, setAuthToken] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [favourites, setFavourites] = useState([]);
  const [viewFav, setViewFav] = useState([]);

  //restaurants states

  const [restaurants, setRestaurants] = useState([]);
  const [restaurantNewDetails, saveRestaurantNewDetails] = useState({
    name: '',
    neighborhood: '',
    address: '',
    cuisine_type: '',
  });
  const [details, saveDetails] = useState({});
  const [name, saveName] = useState('');
  const [neighborhood, saveNeighborhood] = useState('');
  const [address, saveAddress] = useState('');
  const [cuisine_type, saveCuisineType] = useState('');


  const checkIfLoggedIn = () => {
    userService
      .getUser()
      .then((result) => {
        setLoggedIn(true);
        setUser(result.username);
        setSession(true);
        setUserID(result.id)
      });
  };

  const loadingFavDetails = () => {
    restaurantsService
      .getAllRestaurants()
      .then((res) => setViewFav(restaurants.filter((res) => favourites.includes(res._id))))
      .catch((err) => console.error('error', err));
  };

  const loadingRestaurants = async () => {
    await restaurantsService
      .getAllRestaurants()
      .then((res) => console.log(res))
      .catch((err) => console.error('error', err));
  };

  const getUser = (id) => {
    userService
      .getUser(id)
      .then((res) => {setFavourites(res.favourites); setViewFav(res.favourites)})
      .catch((err) => console.error('error', err));
  };

  const values = React.useMemo(() => (
    {
      loggedIn, authToken, currentUser, viewFav, credentials, alert, message, restaurants, favourites, restaurantNewDetails, details, name, neighborhood, address, cuisine_type,
       setLoggedIn, loadingFavDetails, setAuthToken, getUser, setCurrentUser, setViewFav, setCredentials, setAlert, setMessage, saveRestaurantNewDetails, setFavourites, setRestaurants, checkIfLoggedIn, loadingRestaurants, saveDetails, saveName, saveNeighborhood, saveAddress,  saveCuisineType, 
    }),
    [
      loggedIn, authToken, currentUser, alert, message, viewFav, credentials, favourites, restaurants, restaurantNewDetails, details, name, neighborhood, address, cuisine_type]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {

  const context = useContext(AuthContext);
  if (!context) {
    console.error('Error deploying App Context!!!');
  }
  return context;
};


export default useAuthContext;

