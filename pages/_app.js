import App, { Container } from 'next/app';
import { AuthContextProvider } from "../context/authContext";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    );
  }
}

export default MyApp;