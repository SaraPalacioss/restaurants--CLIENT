import App from 'next/app';
import { AuthContextProvider } from "../context/authContext";
import React from 'react';
import '../styles/globals.css';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";




class MyApp extends App {

  // componentDidMount() {
  //   if (localStorage.token) {
  //     // Set auth token header auth
  //     const token = localStorage.jwtToken;
  //     setAuthToken(token);
  //     // Decode token and get user info and exp
  //     const decoded = jwt_decode(token);
  //     // Set user and isAuthenticated
  //     setCurrentUser(decoded);
  //     // Check for expired token
  //     const currentTime = Date.now() / 1000; // to get in milliseconds
  //     if (decoded.exp < currentTime) {
  //       // Logout user
  //       store.dispatch(logoutUser());
    
  //       // Redirect to login
  //       window.location.href = "./auth/login";
  //     }
  //   }
  // }
 

  render() {
    const { Component, pageProps } = this.props;
    const Layout = Component.Layout ? Component.Layout : React.Fragment;

    return (
      <AuthContextProvider>
        <Layout>
        <Component {...pageProps} />
    
        </Layout>
      </AuthContextProvider>
    );
  }
}

export default MyApp;