import fs from 'fs';
import path from 'path';

import React from 'react';
import styled, { css } from 'styled-components';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { BaseLink, BaseTitle } from '../components/Typography';
import Phone from '../art/Phone';
import { ContentContext, loadManyContentFiles } from '../content';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightOrange};
`;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: ${({ theme, max }) => theme.max[max || '3x']};
  margin-left: auto;
  margin-right: auto;
  padding: ${({ theme }) => theme.spacing[9]} ${({ theme }) => theme.spacing[7]};

  flex-grow: 1;

  svg {
    transform: scale(0.5);
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }
`;

const Headline = styled(BaseTitle)`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const Link = styled(BaseLink)`
  text-align: center;
`;

export default function _404(props) {
  const { content } = props;

  return (
    <ContentContext.Provider value={content}>
      <Navigation />
      <Layout>
        <Container>
          <Phone />
          <Headline>{content['404Headline']}</Headline>
          <Link href="/">{content['404LinkLabel']}</Link>
        </Container>
        <Footer />
      </Layout>
    </ContentContext.Provider>
  );
}

export async function getStaticProps(context) {
  const content = await loadManyContentFiles(fs, path, [
    'components/404',
    'components/nav',
    'components/footer',
  ]);

  return {
    props: {
      content,
    },
  }
}
