import fs from 'fs';
import path from 'path';

import React from 'react';
import styled, { css } from 'styled-components';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { BlueButton } from '../components/Button';
import { BaseHeader, BaseLink, BaseParagraph } from '../components/Typography';
import { ContentContext, loadManyContentFiles } from '../content';

function mapSteps(homepageSteps, content) {
  return homepageSteps.split(',').map((key) => ({
    label: content[`${key}Label`],
    title: content[`${key}Title`],
    copy: content[`${key}Copy`],
  }));
}

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

const StepsSection = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  overflow: hidden;

  @media ${({ theme }) => theme.media.desktop} {
    padding-top: ${({ theme }) => theme.spacing[7]};
    padding-bottom: ${({ theme }) => theme.spacing[9]};

    &:after, &:before {
      content: '';
      display: block;
      position: absolute;
      width: 8px;
    }

    &:before {
      background-color: ${({ theme }) => theme.colors.blue};
      top: -${({ theme }) => theme.spacing[7]};
      height: calc(100% - ${({ theme }) => theme.spacing[2]});
      left: calc(50% - ${({ theme }) => theme.spacing[9]});
      z-index: -10;
    }

    &:after {
      background-color: ${({ theme }) => theme.colors.lightBlue};
      top: ${({ theme }) => theme.spacing[2]};
      height: calc(100% - ${({ theme }) => theme.spacing[8]});
      left: calc(50% - ${({ theme }) => theme.spacing[9]} + 4px);
      z-index: -11;
    }
  }
`;

const StepsSectionTitleRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing[11]};

  @media ${({ theme }) => theme.media.desktop} {
    margin-bottom: 0;
  }
`;

const StepsSectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: 96px;
  font-weight: ${({ theme }) => theme.fonts.weight.black};
  font-style: italic;
  color: ${({ theme }) => theme.colors.blue};
  text-transform: uppercase;
  line-height: 1;
  margin-left: -20px;

  @media ${({ theme }) => theme.media.tablet} {
    margin-left: -24px;
  }

  @media ${({ theme }) => theme.media.desktop} {
    font-size: 128px;
  }

  @media (min-width: 1600px) {
    font-size: 196px;
    margin-left: -36px;
  }
`;

const StepsSectionSubtitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.size[14]};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  font-style: italic;
  color: ${({ theme }) => theme.colors.blue};
  text-transform: uppercase;
  margin-left: ${({ theme }) => theme.spacing[4]};
`;

const StepCard = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - ${({ theme }) => theme.spacing[7]});
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing[7]} ${({ theme }) => theme.spacing[8]};

  @media ${({ theme }) => theme.media.tablet} {
    width: 100%;
    max-width: ${({ theme }) => theme.max['2x']};
  }

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
    background-image: url(/patterns/hideout.png);
    background-size: 20px;
    background-repeat: repeat;

    @media ${({ theme }) => theme.media.tablet} {
      top: ${({ theme }) => theme.spacing[8]};
      left: ${({ theme }) => theme.spacing[8]};
    }
  }
`;

const StepsSectionRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  max-width: calc(${({ theme }) => theme.max['2x']} * 2);
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${({ theme }) => theme.spacing[11]};

  &:nth-child(2) ${StepCard}:after {
    background-image: url(/patterns/tic-tac-toe.png);
    background-size: 32px;
  }

  &:nth-child(3) ${StepCard}::after {
    background-image: url(/patterns/wiggle.png);
    background-size: 26px 13px;
  }

  @media ${({ theme }) => theme.media.tablet} {
    &:nth-child(even) {
      justify-content: flex-start;
    }
  }

  @media ${({ theme }) => theme.media.desktop} {
    &:first-of-type {
      margin-top: -${({ theme }) => theme.spacing[12]};
    }
  }

  @media (min-width: 1600px) {
    &:first-of-type {
      margin-top: calc(-${({ theme }) => theme.spacing[12]} * 2);
    }
  }
`;

const StepCardDetail = styled.p`
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.size[12]};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  color: ${({ theme }) => theme.colors.lightBlue};
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const StepCardHeader = styled(BaseHeader)`
  color: ${({ theme }) => theme.colors.blue};
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing[7]};
`;

const PostStepsSection = styled.section`
  display: flex;
  flex-direction: column;
  ${({ center }) => center && css`align-items: center;`}
  width: 100%;
  max-width: ${({ theme }) => theme.max['3x']};
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${({ theme }) => theme.spacing[9]};
  padding: ${({ theme }) => theme.spacing[7]};
`;

const PostStepsHeader = styled.h2`
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.size[36]};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.blue};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[7]};

  @media ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fonts.size[48]};
  }
`;

const PostStepsCopy = styled.p`
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.size[18]};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[7]};

  @media ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fonts.size[24]};
  }
`;

const QuoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

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
`;

const Quote = styled.p`
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.size[24]};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  font-style: italic;
  color: ${({ theme }) => theme.colors.black};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${({ theme }) => theme.spacing[7]};

  @media ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fonts.size[28]};
  }
`;

const QuoteAuthor = styled.p`
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.size[18]};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.blue};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const QuoteTitle = styled(QuoteAuthor)`
  font-size: ${({ theme }) => theme.fonts.size[14]};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  color: ${({ theme }) => theme.colors.lightBlue};
`;

const AboutHeader = styled(BaseHeader)`
  margin-bottom: ${({ theme }) => theme.spacing[7]};
`;

const AboutParagraph = styled(BaseParagraph)`
  margin-bottom: ${({ theme }) => theme.spacing[7]};
`;

export default function Homepage(props) {
  const { content } = props;

  const {
    homepageTitle,
    homepageSubtitle,
    homepageHeroCta,
    homepageStepsTitle,
    homepageStepsSubtitle,
    homepageSteps,
    homepageStepsCallToActionHeader,
    homepageStepsCallToActionCopy,
    homepageQuote,
    homepageQuoteAuthor,
    homepageQuoteTitle,
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
      <StepsSection>
        <StepsSectionTitleRow>
          {homepageStepsTitle.split(',').map((word) => (
            <StepsSectionTitle key={word}>
              {word}
            </StepsSectionTitle>
          ))}
          <StepsSectionSubtitle>
            {homepageStepsSubtitle}
          </StepsSectionSubtitle>
        </StepsSectionTitleRow>
        <div>
          {mapSteps(homepageSteps, content).map(({
            label,
            title,
            copy,
          }) => (
            <StepsSectionRow key={title}>
              <StepCard>
                <StepCardDetail>{label}</StepCardDetail>
                <StepCardHeader>{title}</StepCardHeader>
                <BaseParagraph>{copy}</BaseParagraph>
              </StepCard>
            </StepsSectionRow>
          ))}
        </div>
      </StepsSection>
      <PostStepsSection center>
        <PostStepsHeader>
          {homepageStepsCallToActionHeader}
        </PostStepsHeader>
        <PostStepsCopy>
          {homepageStepsCallToActionCopy}
        </PostStepsCopy>
        <BlueButton href={defaultMobilizeEventLink}>
          {defaultSignupButtonLabel}
        </BlueButton>
      </PostStepsSection>
      <PostStepsSection>
        <QuoteContainer>
          <Quote>"{homepageQuote}"</Quote>
          <QuoteAuthor>{homepageQuoteAuthor}</QuoteAuthor>
          <QuoteTitle>{homepageQuoteTitle}</QuoteTitle>
        </QuoteContainer>
      </PostStepsSection>
      <PostStepsSection>
        <AboutHeader>{homepageAboutHeader}</AboutHeader>
        <AboutParagraph>{homepageAboutCopy}</AboutParagraph>
        <BaseLink href={homepageAboutLinkTarget}>
          {homepageAboutLinkLabel}
        </BaseLink>
      </PostStepsSection>
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
