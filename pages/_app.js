import App from 'next/app';
import { AuthContextProvider } from "../context/authContext";
import React from 'react';
import '../styles/globals.css';

import { createGlobalStyle, ThemeProvider } from "styled-components";
import Head from 'next/head';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

  }
 a {
  color: black !important;
  text-decoration: none !important;
}

* {
  box-sizing: border-box;
}
`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};


class MyApp extends App {

  render() {
    const { Component, pageProps } = this.props;
    const Layout = Component.Layout ? Component.Layout : React.Fragment;

    return (
      <AuthContextProvider>
        <Head>
          <title>Restaurants Next JS App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </AuthContextProvider>
    );
  }
}

export default MyApp;