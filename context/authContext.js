import React, { useContext, useState, useEffect, createContext } from 'react';
import userService from '../services/user.service';

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {

  const [user, setUser] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [session, setSession] = useState(false);
  const [userID, setUserID] = useState('');
  const [favourites, setFavourites] = useState([]);
  const [alert, setAlert] = useState(false)
  const [message, setMessage] = useState('')
  const [allRestaurants, setAllRestaurants] = useState(false)
  const [filterFavs, setFilterFavs] = useState(false)
  const [restaurants, setRestaurants] = useState([]);

  const values = React.useMemo(() => (
    { user, loggedIn,session, userID, alert, message  , restaurants, favourites , allRestaurants, filterFavs 
      ,setUser, setLoggedIn, setSession, setUserID, setAlert, setMessage, setFavourites, setAllRestaurants, setRestaurants, setFilterFavs
    }), 
    [ 
      user, loggedIn, session, userID, alert, message, favourites,restaurants, filterFavs, allRestaurants ]);   

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {

  const context = useContext(AuthContext);
  if(!context){
    console.error('Error deploying App Context!!!');
  }
  return context;
}


export default useAuthContext;

// export const useAuth = () => useContext(AuthContext)
