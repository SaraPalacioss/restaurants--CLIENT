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
    lat: '',
    lng: '',
    image: '',
    cuisine_type: '',
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: '',
  });
  const [details, saveDetails] = useState({});
  const [name, saveName] = useState('');
  const [neighborhood, saveNeighborhood] = useState('');
  const [image, saveImage] = useState('');
  const [address, saveAddress] = useState('');
  const [lat, saveLat] = useState('');
  const [lng, saveLng] = useState('');
  const [cuisine_type, saveCuisineType] = useState('');
  const [monday, saveMonday] = useState('');
  const [tuesday, saveTuesday] = useState('');
  const [wednesday, saveWednesday] = useState('');
  const [thursday, saveThursday] = useState('');
  const [friday, saveFriday] = useState('');
  const [saturday, saveSaturday] = useState('');
  const [sunday, saveSunday] = useState('');


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
  }

  const loadingRestaurants = async () => {
    await restaurantsService
      .getAllRestaurants()
      .then((res) => console.log(res))
      .catch((err) => console.error('error', err));
  }

  const getUser = (id) => {
    userService
      .getUser(id)
      .then((res) => {setFavourites(res.favourites); setViewFav(res.favourites)})
      .catch((err) => console.error('error', err));
  }

  const values = React.useMemo(() => (
    {
      loggedIn, authToken, currentUser, viewFav, credentials, alert, message, restaurants, favourites, restaurantNewDetails, details, name, neighborhood, image, address, lat, lng, cuisine_type, monday, tuesday, wednesday, thursday, friday, saturday, sunday
      , setLoggedIn, loadingFavDetails, setAuthToken, getUser, setCurrentUser, setViewFav, setCredentials, setAlert, setMessage, saveRestaurantNewDetails, setFavourites, setRestaurants, checkIfLoggedIn, loadingRestaurants, saveDetails, saveName, saveNeighborhood, saveImage, saveAddress, saveLat, saveLng, saveCuisineType, saveMonday, saveTuesday, saveWednesday, saveThursday, saveFriday, saveSaturday, saveSunday
    }),
    [
      loggedIn, authToken, currentUser, alert, message, viewFav, credentials, favourites, restaurants, restaurantNewDetails, details, name, neighborhood, image, address, lat, lng, cuisine_type, monday, tuesday, wednesday, thursday, friday, saturday, sunday]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}


export function useAuthContext() {

  const context = useContext(AuthContext);
  if (!context) {
    console.error('Error deploying App Context!!!');
  }
  return context;
}


export default useAuthContext;

