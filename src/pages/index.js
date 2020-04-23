import fs from 'fs';
import path from 'path';

import React from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { BlueButton } from '../components/Button';
import { BaseHeader, BaseLink, BaseParagraph, BaseTitle } from '../components/Typography';
import { ContentContext, loadManyContentFiles } from '../content';

function mapSteps(homepageSteps, content) {
  return homepageSteps.split(',').map((key) => ({
    label: content[`${key}Label`],
    title: content[`${key}Title`],
    copy: content[`${key}Copy`],
    isHighlighted: content.homepageStepHighlights === key,
  }));
}

const GlobalPageStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.lightOrange};
  }
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  max-width: ${({ theme }) => theme.max['4x']};
  margin-left: auto;
  margin-right: auto;
  margin-top: calc(
    ${({ theme }) => theme.spacing.navHeight}
    + ${({ theme }) => theme.spacing[11]}
  );
  margin-bottom: ${({ theme }) => theme.spacing[11]};

  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    display: block;
    width: 100%;
    height: calc(100% - ${({ theme }) => theme.spacing[12]});
    margin-top: ${({ theme }) => theme.spacing[9]};
    background-color: ${({ theme }) => theme.colors.lightBlue};
    background-image: url(/patterns/morphing-diamonds.png);
    background-size: 29px 30px;
    background-repeat: repeat;

    @media ${({ theme }) => theme.media.tablet} {
      margin-left: ${({ theme }) => theme.spacing[7]};
      max-width: calc(${({ theme }) => theme.max['4x']} - ${({ theme }) => theme.spacing[7]});
      height: calc(100% - ${({ theme }) => theme.spacing[11]});
    }
  }

  @media ${({ theme }) => theme.media.tablet} {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const HeroTitleBlock = styled.div`
  background-color: ${({ theme }) => theme.colors.blue};
  padding-top: ${({ theme }) => theme.spacing[8]};
  padding-bottom: ${({ theme }) => theme.spacing[9]};
  padding-left: ${({ theme }) => theme.spacing[7]};
  padding-right: ${({ theme }) => theme.spacing[7]};
  width: calc(100% - ${({ theme }) => theme.spacing[7]});

  @media ${({ theme }) => theme.media.tablet} {
    width: 40%;
    margin-right: 0;
    padding-right: ${({ theme }) => theme.spacing[9]};
  }
`;

const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.size[28]};
  font-weight: ${({ theme }) => theme.fonts.weight.black};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  line-height: 1.2;

  @media ${({ theme }) => theme.media.mobileLarge} {
    font-size: ${({ theme }) => theme.fonts.size[36]};
  }

  @media ${({ theme }) => theme.media.desktop} {
    font-size: ${({ theme }) => theme.fonts.size[48]};
  }
`;

const HeroSubtitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  padding-top: ${({ theme }) => theme.spacing[8]};
  padding-bottom: ${({ theme }) => theme.spacing[8]};
  padding-left: ${({ theme }) => theme.spacing[7]};
  padding-right: ${({ theme }) => theme.spacing[7]};
  margin-top: -${({ theme }) => theme.spacing[7]};
  margin-left: ${({ theme }) => theme.spacing[7]};

  @media ${({ theme }) => theme.media.tablet} {
    width: 60%;
    margin-top: ${({ theme }) => theme.spacing[7]};
    margin-left: -${({ theme }) => theme.spacing[7]};
  }
`;

const HeroSubtitleParagraph = styled(BaseParagraph)`
  margin-bottom: ${({ theme }) => theme.spacing[4]};

  @media ${({ theme }) => theme.media.tablet} {
    margin-bottom: ${({ theme }) => theme.spacing[7]};
  }
`;

const HeroSubtitleCallToAction = styled.p`
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.size[24]};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.blue};
  margin-bottom: ${({ theme }) => theme.spacing[7]};
`;

export default function Homepage(props) {
  const { content } = props;

  const {
    homepageTitle,
    homepageSubtitle,
    homepageHeroCta,
    homepageStepsTitle,
    homepageSteps,
    homepageCallToAction,
    homepageQuote,
    homepageQuoteAuthor,
    homepageQuoteByline,
    homepageAboutHeader,
    homepageAboutCopy,
    homepageAboutLinkLabel,
    homepageAboutLinkTarget,
    defaultMobilizeEventLink,
    defaultSignupButtonLabel,
  } = content;

  const homepageStepsFormatted = mapSteps(homepageSteps, content);

  return (
    <ContentContext.Provider value={content}>
      <Navigation />
      <GlobalPageStyle />
      <HeroSection>
        <HeroTitleBlock>
          <HeroTitle>{homepageTitle}</HeroTitle>
        </HeroTitleBlock>
        <HeroSubtitleBlock>
          {(homepageSubtitle || '').split('\n').map((line) => (
            <HeroSubtitleParagraph key={line}>
              {line}
            </HeroSubtitleParagraph>
          ))}
          <HeroSubtitleCallToAction>
            {homepageHeroCta}
          </HeroSubtitleCallToAction>
          <BlueButton href={defaultMobilizeEventLink}>
            {defaultSignupButtonLabel}
          </BlueButton>
        </HeroSubtitleBlock>
      </HeroSection>
      <Footer />
    </ContentContext.Provider>
  );
}

export async function getStaticProps(context) {
  const content = await loadManyContentFiles(fs, path, [
    'pages/homepage',
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
