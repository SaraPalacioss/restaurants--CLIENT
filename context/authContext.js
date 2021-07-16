import React, { useContext, useState, createContext } from 'react';

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [session, setSession] = useState(false);

  const values = React.useMemo(() => (
    { user, loggedIn,session,      
      setUser, setLoggedIn, setSession  
    }), 
    [ 
      user, loggedIn, session ]);   

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