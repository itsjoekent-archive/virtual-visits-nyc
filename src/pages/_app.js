import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '../theme';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, h1, h2, h3, h4, p {
    margin: 0;
  }

  body {
    background-color: ${({ theme }) => theme.colors.lightOrange};
  }
`;

export default class MyApp extends App {
  render() {
    const { Component, pageProps, content } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700;800&display=swap" rel="stylesheet"></link>
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
