import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Navigation from '../components/Navigation';
// import Footer from '../Footer';
import theme from '../theme';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, h1, h2, h3, h4, p {
    margin: 0;
  }
`;

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&family=Raleway:wght@400;700;900&display=swap" rel="stylesheet" />
        </Head>
        <GlobalStyle />
        <Navigation />
        <Component {...pageProps} />
        {/* <Footer /> */}
      </ThemeProvider>
    );
  }
}
