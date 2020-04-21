import React from 'react';
import styled from 'styled-components';
import { BaseTitle } from './Typography';
import { useContent } from '../content';
import Phone from '../art/Phone';

const Section = styled.section`
  display: block;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.cream};

  padding-left: ${({ theme }) => theme.spacing[8]};
  padding-right: ${({ theme }) => theme.spacing[8]};

  padding-top: calc(
    ${({ theme }) => theme.spacing.navHeight}
    + ${({ theme }) => theme.spacing[9]}
  );

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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  max-width: ${({ theme }) => theme.max['3x']};
  margin-left: auto;
  margin-right: auto;

  @media ${({ theme }) => theme.media.desktop} {
    padding-bottom: ${({ theme }) => theme.spacing['9']};
  }
`;

const Title = styled(BaseTitle)`
  width: 100%;
  max-width: ${({ theme }) => theme.max['2x']};
  margin-bottom: ${({ theme }) => theme.spacing[4]};

  @media ${({ theme }) => theme.media.desktop} {
    margin-bottom: ${({ theme }) => theme.spacing[8]};
  }
`;

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.size[16]};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  color: ${({ theme }) => theme.colors.black};

  width: 100%;
  max-width: 80%;
  margin-bottom: ${({ theme }) => theme.spacing[4]};

  @media ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fonts.size[18]};
    max-width: ${({ theme }) => theme.max['1x']};
    margin-bottom: ${({ theme }) => theme.spacing[7]};
  }
`;

const PhoneWrapper = styled.div`
  position: relative;

  @media ${({ theme }) => theme.media.desktop} {
    bottom: -${({ theme }) => theme.spacing['9']};
  }

  svg {
    position: absolute;
    opacity: 0.5;
    bottom: 0;
    right: -75px;
    transform: scale(0.5);
    transform-origin: bottom right;

    @media ${({ theme }) => theme.media.mobileLarge} {
      transform: scale(0.6);
    }

    @media ${({ theme }) => theme.media.tablet} {
      transform: scale(1);
      left: 85%;
      right: auto;
      opacity: 1;
    }
  }
`;

export default function Hero() {
  const {
    heroTitle,
    heroSubtitle,
  } = useContent();

  return (
    <Section>
      <Content>
        <Title>{heroTitle}</Title>
        {(heroSubtitle || '').split('\n').map((line) => (
          <Subtitle key={line}>{line}</Subtitle>
        ))}
        <PhoneWrapper>
          <Phone />
        </PhoneWrapper>
      </Content>
    </Section>
  );
}
