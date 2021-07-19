import App from 'next/app';
import { AuthContextProvider } from "../context/authContext";
import React from 'react';
import '../styles/globals.css';





class MyApp extends App {

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