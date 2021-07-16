import React, { useContext, useState, createContext } from 'react';

//Context
export const AuthContext = createContext(null);

//Provider
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [session, setSession] = useState(false);



  //
  const values = React.useMemo(() => (
    { user, loggedIn,session,      // States que seran visibles en el contexto.
      setUser, setLoggedIn, setSession   // Funciones que son exportadas para manejo externo.
    }), 
    [ 
      user, loggedIn, session ]);   // States que serán visibles en el contexto.

  // Interface donde será expuesto como proveedor y envolverá la App.
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

//
export function useAuthContext() {
  const context = useContext(AuthContext);

  if(!context){
    console.error('Error deploying App Context!!!');
  }

  return context;
}

export default useAuthContext;