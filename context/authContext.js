import React, { useContext, useState, createContext } from 'react';
import userService from '../services/user.service';
import restaurantsService from '../services/restaurants.service';

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {

  // user states
  const [user, setUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [session, setSession] = useState(false);
  const [userID, setUserID] = useState('');
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [alert, setAlert] = useState(false)
  const [message, setMessage] = useState('')
  const [favourites, setFavourites] = useState([]);
  const [viewFav, setViewFav] = useState([])
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
  const [neighborhood, saveNeighborhood] = useState('')
  const [image, saveImage] = useState('')
  const [address, saveAddress] = useState('')
  const [lat, saveLat] = useState('')
  const [lng, saveLng] = useState('')
  const [cuisine_type, saveCuisineType] = useState('')
  const [monday, saveMonday] = useState('')
  const [tuesday, saveTuesday] = useState('')
  const [wednesday, saveWednesday] = useState('')
  const [thursday, saveThursday] = useState('')
  const [friday, saveFriday] = useState('')
  const [saturday, saveSaturday] = useState('')
  const [sunday, saveSunday] = useState('')


  const checkIfLoggedIn = () => {
    userService
      .loggedin()
      .then((result) => {
        setLoggedIn(true);
        setUser(result.username);
        setSession(true);
        setUserID(result.id)
        console.log(result)
      });
  };

  const getUser = async () => {
    await userService
      .loggedin()
      .then((res) => setFavourites(res.favourites))
      .catch((err) => console.error('error', err));
  }

  const loadingRestaurants = () => {
    restaurantsService
      .getAllRestaurants()
      .then((res) => console.log(res))
      .catch((err) => console.error('error', err));
  }

  

  const values = React.useMemo(() => (
    {
      user, loggedIn, session, userID, viewFav, credentials, alert, message, restaurants, favourites, restaurantNewDetails, details, name, neighborhood, image, address, lat, lng, cuisine_type, monday, tuesday, wednesday, thursday, friday, saturday, sunday
      , setUser, setLoggedIn, setSession, setViewFav, setUserID, setCredentials, setAlert, getUser, setMessage, saveRestaurantNewDetails, setFavourites, setRestaurants, checkIfLoggedIn, loadingRestaurants, saveDetails, saveName, saveNeighborhood, saveImage, saveAddress, saveLat, saveLng, saveCuisineType, saveMonday, saveTuesday, saveWednesday, saveThursday, saveFriday, saveSaturday, saveSunday
    }),
    [
      user, loggedIn, session, userID, alert, message, viewFav, credentials, favourites, restaurants, restaurantNewDetails, details, name, neighborhood, image, address, lat, lng, cuisine_type, monday, tuesday, wednesday, thursday, friday, saturday, sunday]);

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

// export const useAuth = () => useContext(AuthContext)
