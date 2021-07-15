import React, { useContext, createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [session, setSession] = useState();

    React.useEffect(() => {

    }, []);

    const values = React.useMemo(() => (
        { isLoggedIn, setIsLoggedIn, user, setUser, session, setSession }),
        [setIsLoggedIn, setUser, setSession]);

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        console.error('Error deploying Auth Context!!!');
    }

    return context;
}

export default useAuthContext;
