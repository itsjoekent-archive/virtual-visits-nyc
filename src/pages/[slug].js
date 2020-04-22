import fs from 'fs';
import path from 'path';

import React from 'react';
import marksy from 'marksy';
import styled, { css } from 'styled-components';
import Signup, { ORANGE_PALETTE, COLUMN_DIRECTION } from '../components/Signup';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { BaseHeader, BaseLink, BaseParagraph, BaseTitle } from '../components/Typography';
import { ContentContext, loadAllPagePaths, loadManyContentFiles } from '../content';

const Hero = styled.div`
  display: block;
  background-color: ${({ theme }) => theme.colors.cream};

  padding-left: ${({ theme }) => theme.spacing[8]};
  padding-right: ${({ theme }) => theme.spacing[8]};

  padding-top: calc(
    ${({ theme }) => theme.spacing.navHeight}
    + ${({ theme }) => theme.spacing[9]}
  );

  margin-bottom: ${({ theme }) => theme.spacing[7]};

  @media (min-width: ${({ theme }) => theme.max['3x']}) {
    padding-left: ${({ theme }) => theme.spacing[4]};
    padding-right: ${({ theme }) => theme.spacing[4]};
  }

  @media ${({ theme }) => theme.media.desktop} {
    padding-top: calc(
      ${({ theme }) => theme.spacing.navHeight}
      + ${({ theme }) => theme.spacing[11]}
    );
  }
`;

const HeroTitle = styled(BaseTitle)`
  width: 100%;
  max-width: ${({ theme }) => theme.max['3x']};
  margin-left: auto;
  margin-right: auto;
  padding-bottom: ${({ theme }) => theme.spacing[7]};
`;

const MainSection = styled.main`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[7]};
  background-color: ${({ theme }) => theme.colors.white};
  padding-bottom: ${({ theme }) => theme.spacing[7]};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: ${({ theme }) => theme.max['3x']};
  margin-left: auto;
  margin-right: auto;
`;

const PageHeader = styled(BaseHeader)`
  margin-bottom: ${({ theme }) => theme.spacing[7]};
`;

const PageCopy = styled(BaseParagraph)`
  margin-bottom: ${({ theme }) => theme.spacing[7]};
  max-width: ${({ theme }) => theme.max['2x']};
  line-height: 1.4;
`;

const compileMarkup = marksy({
  createElement: React.createElement,
  elements: {
    h2: PageHeader,
    a: BaseLink,
    p: PageCopy,
  },
});

export default function Post(props) {
  const { content } = props;

  const {
    pageTitle,
    pageContent,
    defaultMobilizeEventLink,
  } = content;

  const finalPageContent = (pageContent || '').replace('%%defaultMobilizeEventLink%%', defaultMobilizeEventLink);

  return (
    <ContentContext.Provider value={content}>
      <Navigation />
      <Hero>
        <HeroTitle>{pageTitle}</HeroTitle>
      </Hero>
      <MainSection>
        <Content>
          {compileMarkup(finalPageContent).tree}
        </Content>
      </MainSection>
      <Signup palette={ORANGE_PALETTE} />
      <Footer />
    </ContentContext.Provider>
  );
}

export async function getStaticProps(context) {
  const { params: { slug } } = context;

  const content = await loadManyContentFiles(fs, path, [
    `pages/${slug}`,
    'components/form',
    'components/nav',
    'components/footer',
  ]);

  return {
    props: {
      content,
    },
  }
}

export async function getStaticPaths() {
  const pages = loadAllPagePaths(fs, path);

  return {
    paths: pages.map((page) => ({ params: { slug: page } })),
    fallback: false,
  };
}
