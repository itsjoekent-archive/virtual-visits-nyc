import fs from 'fs';
import path from 'path';

import React from 'react';
import marksy from 'marksy';
import styled, { css } from 'styled-components';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { WhiteButton } from '../../components/Button';
import { BaseHeader, BaseLink, BaseParagraph, BaseTitle } from '../../components/Typography';
import { ContentContext, loadAllPagePaths, loadManyContentFiles } from '../../content';

const Hero = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  max-width: ${({ theme }) => theme.max['3x']};
  margin-left: auto;
  margin-right: auto;

  padding-left: ${({ theme }) => theme.spacing[7]};
  padding-right: ${({ theme }) => theme.spacing[7]};

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
  width: fit-content;
  margin-left: -${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[7]};
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;

  &:after {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    top: ${({ theme }) => theme.spacing[4]};
    left: ${({ theme }) => theme.spacing[4]};
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.lightBlue};
    background-image: url(/patterns/wiggle.png);
    background-size: 26px 13px;
    background-repeat: repeat;
  }
`;

const MainSection = styled.main`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing[7]};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: ${({ theme }) => theme.max['3x']};
  margin-left: auto;
  margin-right: auto;
  padding: ${({ theme }) => theme.spacing[7]};

  .gallery {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spacing[9]};

    span {
      display: block;
      flex: 1 0 0px;

      padding-left: ${({ theme }) => theme.spacing[4]};
      padding-right: ${({ theme }) => theme.spacing[4]};

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
      }

      img {
        width: 100%;
      }
    }
  }

  blockquote {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: ${({ theme }) => theme.spacing[9]};

    &:after, &:before {
      content: '';
      display: block;
      position: absolute;
      width: 8px;
    }

    &:before {
      background-color: ${({ theme }) => theme.colors.blue};
      top: 0;
      height: 100%;
      left: -${({ theme }) => theme.spacing[6]};
      z-index: -10;
    }

    &:after {
      background-color: ${({ theme }) => theme.colors.lightBlue};
      top: ${({ theme }) => theme.spacing[2]};
      height: 100%;
      left: calc(-${({ theme }) => theme.spacing[6]} + 4px);
      z-index: -11;
    }

    @media ${({ theme }) => theme.media.tablet} {
      &:before {
        left: -${({ theme }) => theme.spacing[7]};
      }

      &:after {
        left: calc(-${({ theme }) => theme.spacing[7]} + 4px);
      }
    }

    p {
      font-family: ${({ theme }) => theme.fonts.family};
      font-size: ${({ theme }) => theme.fonts.size[18]};
      font-weight: ${({ theme }) => theme.fonts.weight.regular};
      font-style: italic;
      color: ${({ theme }) => theme.colors.black};
      margin-bottom: ${({ theme }) => theme.spacing[7]};
    }

    footer {
      font-family: ${({ theme }) => theme.fonts.family};
      font-size: ${({ theme }) => theme.fonts.size[18]};
      font-weight: ${({ theme }) => theme.fonts.weight.bold};
      color: ${({ theme }) => theme.colors.blue};
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    cite {
      display: block;
      font-size: ${({ theme }) => theme.fonts.size[14]};
      font-weight: ${({ theme }) => theme.fonts.weight.regular};
      font-style: normal;
      color: ${({ theme }) => theme.colors.lightBlue};
    }
  }

`;

const PageHeader = styled(BaseHeader)`
  margin-bottom: ${({ theme }) => theme.spacing[7]};
`;

const PageSubHeader = styled(BaseHeader)`
  font-size: ${({ theme }) => theme.fonts.size[18]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};

  @media ${({ theme }) => theme.media.desktop} {
    font-size: ${({ theme }) => theme.fonts.size[24]};
  }
`;

const PageCopy = styled(BaseParagraph)`
  margin-bottom: ${({ theme }) => theme.spacing[7]};
  max-width: ${({ theme }) => theme.max['2x']};
  line-height: 1.4;
`;

const compileMarkup = marksy({
  createElement: React.createElement,
  components: {
    QuoteBlock: (props) => {
      const { quote, author, title } = props;

      return (
        <QuoteContainer>
          <Quote>"{quote}"</Quote>
          <QuoteAuthor>{author}</QuoteAuthor>
          <QuoteTitle>{title}</QuoteTitle>
        </QuoteContainer>
      );
    },
  },
  elements: {
    h2: PageHeader,
    h3: PageSubHeader,
    a: BaseLink,
    p: PageCopy,
  },
});

const SignupContainer = styled.div`
  display: block;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.blue};
`;

const SignupContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: ${({ theme }) => theme.max['3x']};
  margin-left: auto;
  margin-right: auto;

  @media ${({ theme }) => theme.media.desktop} {
    flex-direction: row;
  }
`;

const SignupHeader = styled.h3`
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.size[24]};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[7]};

  @media ${({ theme }) => theme.media.desktop} {
    margin-bottom: 0;
    margin-right: ${({ theme }) => theme.spacing[7]};
    text-align: left;
  }
`;

export default function Post(props) {
  const { content } = props;

  const {
    pageTitle,
    pageContent,
    defaultMobilizeEventLink,
    defaultCallToAction,
    defaultSignupButtonLabel,
  } = content;

  const finalPageContent = (pageContent || '')
    .replace('%%defaultMobilizeEventLink%%', defaultMobilizeEventLink)
    .split('\n').map((line) => `${line}\n\n`).join('\n');

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
      <SignupContainer>
        <SignupContent>
          <SignupHeader>{defaultCallToAction}</SignupHeader>
          <WhiteButton href={defaultMobilizeEventLink}>
            {defaultSignupButtonLabel}
          </WhiteButton>
        </SignupContent>
      </SignupContainer>
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
    paths: pages.map((page) => ({ params: { slug: [page] } })),
    fallback: false,
  };
}
