import fs from 'fs';
import path from 'path';

import React from 'react';
import styled, { css } from 'styled-components';
import Hero from '../components/Hero';
import Signup, { ORANGE_PALETTE, COLUMN_DIRECTION } from '../components/Signup';
import Navigation from '../components/Navigation';
import { BaseTitle, BaseHeader, BaseParagraph } from '../components/Typography';
import { loadManyContentFiles, ContentContext } from '../content';

const MidSection = styled.section`
  display: block;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[9]} ${({ theme }) => theme.spacing[7]};
  background-color: ${({ theme }) => theme.colors.white};
`;

const MidSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${({ theme }) => theme.max['3x']};
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
  text-transform: uppercase;
  text-decoration: underline;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const StepHeader = styled(BaseHeader)`
  margin-bottom: ${({ theme }) => theme.spacing[7]};

  ${({ isHighlighted, theme  }) => isHighlighted && css`
    color: ${theme.colors.orange};
  `}
`;

const StepCopy = styled(BaseParagraph)`
  margin-bottom: ${({ theme }) => theme.spacing[7]};
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
  } = content;

  const homepageStepsFormatted = mapSteps(homepageSteps, content);

  return (
    <ContentContext.Provider value={content}>
      <Navigation />
      <Hero />
      <Signup />
      <MidSection>
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
    </ContentContext.Provider>
  );
}

export async function getStaticProps(context) {
  const content = await loadManyContentFiles(fs, path, [
    'pages/homepage',
    'components/form',
    'components/hero',
    'components/nav',
  ]);

  return {
    props: {
      content,
    },
  }
}
