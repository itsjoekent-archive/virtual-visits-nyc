import fs from 'fs';
import path from 'path';

import React from 'react';
import styled, { css } from 'styled-components';
import Hero from '../components/Hero';
import Signup, { ORANGE_PALETTE, COLUMN_DIRECTION } from '../components/Signup';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { BaseHeader, BaseLink, BaseParagraph, BaseTitle } from '../components/Typography';
import { ContentContext, loadManyContentFiles } from '../content';

const MidSection = styled.section`
  display: block;
  width: 100%;
  position: relative;
  padding: ${({ theme }) => theme.spacing[9]} ${({ theme }) => theme.spacing[7]};
  background-color: ${({ theme }) => theme.colors.white};
`;

const MidSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${({ theme, max }) => theme.max[max || '3x']};
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled(BaseTitle)`
  margin-bottom: ${({ theme }) => theme.spacing[7]};
  width: 100%;
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing[7]};

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const StepLabel = styled(BaseParagraph)`
  font-size: 12px;
  text-transform: uppercase;
  text-decoration: underline;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const StepHeader = styled(BaseHeader)`
  margin-bottom: ${({ theme }) => theme.spacing[2]};

  ${({ isHighlighted, theme  }) => isHighlighted && css`
    color: ${theme.colors.orange};
  `}
`;

const StepCopy = styled(BaseParagraph)`
  margin-bottom: ${({ theme }) => theme.spacing[7]};
`;

const QuoteContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[9]};

  @media ${({ theme }) => theme.media.desktop} {
    margin-bottom: ${({ theme }) => theme.spacing[11]};
  }
`;

const Quote = styled.p`
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.size[24]};
  font-weight: ${({ theme }) => theme.fonts.weight.black};
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.black};
  text-transform: uppercase;margin-bottom: ${({ theme }) => theme.spacing[7]};
  letter-spacing: 1px;
  margin-bottom: ${({ theme }) => theme.spacing[4]};

  @media ${({ theme }) => theme.media.desktop} {
    font-size: ${({ theme }) => theme.fonts.size[36]};
  }
`;

const QuoteAuthor = styled.p`
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.size[18]};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.orange};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const QuoteByline = styled.p`
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.size[14]};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  color: ${({ theme }) => theme.colors.black};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CitySkyline = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  opacity: 0.15;

  @media ${({ theme }) => theme.media.tablet} {
    width: 30%;
    opacity: 0.5;
  }
`;

function mapSteps(homepageSteps, content) {
  return homepageSteps.split(',').map((key) => ({
    label: content[`${key}Label`],
    title: content[`${key}Title`],
    copy: content[`${key}Copy`],
    isHighlighted: content.homepageStepHighlights === key,
  }));
}

export default function Homepage(props) {
  const { content } = props;

  const {
    homepageTitle,
    homepageSteps,
    homepageCallToAction,
    homepageQuote,
    homepageQuoteAuthor,
    homepageQuoteByline,
    homepageAboutHeader,
    homepageAboutCopy,
    homepageAboutLinkLabel,
    homepageAboutLinkTarget,
    homepageCityAlt,
  } = content;

  const homepageStepsFormatted = mapSteps(homepageSteps, content);

  return (
    <ContentContext.Provider value={content}>
      <Navigation />
      <Hero />
      <Signup />
      <MidSection as="main">
        <MidSectionContent>
          <Title as="h2">{homepageTitle}</Title>
          {homepageStepsFormatted.map(({ label, title, copy, isHighlighted }) => (
            <StepContainer key={title}>
              <StepLabel as="span">{label}</StepLabel>
              <StepHeader as="h3" isHighlighted={isHighlighted}>
                {title}
              </StepHeader>
              <StepCopy>{copy}</StepCopy>
            </StepContainer>
          ))}
        </MidSectionContent>
      </MidSection>
      <Signup
        direction={COLUMN_DIRECTION}
        palette={ORANGE_PALETTE}
        callToAction={homepageCallToAction}
      />
      <MidSection>
        <MidSectionContent>
          <QuoteContainer>
            <Quote>“{homepageQuote}“</Quote>
            <QuoteAuthor>{homepageQuoteAuthor}</QuoteAuthor>
            <QuoteByline>{homepageQuoteByline}</QuoteByline>
          </QuoteContainer>
          <StepHeader>{homepageAboutHeader}</StepHeader>
          <StepCopy>{homepageAboutCopy}</StepCopy>
          <BaseLink href={homepageAboutLinkTarget}>
            {homepageAboutLinkLabel}
          </BaseLink>
        </MidSectionContent>
        <CitySkyline src="/city.png" alt={homepageCityAlt} />
      </MidSection>
      <Footer />
    </ContentContext.Provider>
  );
}

export async function getStaticProps(context) {
  const content = await loadManyContentFiles(fs, path, [
    'pages/homepage',
    'components/form',
    'components/hero',
    'components/nav',
    'components/footer',
  ]);

  return {
    props: {
      content,
    },
  }
}
