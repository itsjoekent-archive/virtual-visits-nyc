import React from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import { useContent } from '../content';

export const RED_PALETTE = 'RED_PALETTE';
export const ORANGE_PALETTE = 'ORANGE_PALETTE';

export const ROW_DIRECTION = 'ROW_DIRECTION';
export const COLUMN_DIRECTION = 'COLUMN_DIRECTION';

const colorMap = {
  background: {
    [RED_PALETTE]: 'red',
    [ORANGE_PALETTE]: 'orange',
  },
  header: {
    [RED_PALETTE]: 'white',
    [ORANGE_PALETTE]: 'white',
  },
  buttonCopy: {
    [RED_PALETTE]: 'red',
    [ORANGE_PALETTE]: 'white',
    hover: {
      [RED_PALETTE]: 'white',
      [ORANGE_PALETTE]: 'lightRed',
    },
  },
  buttonBackground: {
    [RED_PALETTE]: 'white',
    [ORANGE_PALETTE]: 'lightRed',
    hover: {
      [RED_PALETTE]: 'transparent',
      [ORANGE_PALETTE]: 'white',
    },
  },
  buttonBorder: {
    [RED_PALETTE]: 'white',
    [ORANGE_PALETTE]: 'lightRed',
    hover: {
      [RED_PALETTE]: 'white',
      [ORANGE_PALETTE]: 'white',
    },
  },
};

const maxMap = {
  [ROW_DIRECTION]: 'site',
  [COLUMN_DIRECTION]: '3x',
};

const Container = styled.div`
  display: block;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors[colorMap.background[theme.signup.palette]]};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: ${({ theme }) => theme.max[maxMap[theme.signup.direction]]};
  margin-left: auto;
  margin-right: auto;

  ${({ theme }) => theme.signup.direction === ROW_DIRECTION && css`
    @media ${theme.media.desktop} {
      flex-direction: row;
    }
  `}
`;

const Header = styled.h4`
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.size[24]};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors[colorMap.header[theme.signup.palette]]};
  text-align: center;

  ${({ theme }) => theme.signup.direction === COLUMN_DIRECTION && css`
    margin-bottom: ${theme.spacing[7]};
  `}

  ${({ theme }) => theme.signup.direction === ROW_DIRECTION && css`
    margin-bottom: ${theme.spacing[7]};

    @media ${theme.media.desktop} {
      margin-bottom: 0;
      margin-right: ${theme.spacing[7]};
    }
  `}
`;

function pickColor(from, theme) {
  const value = from[theme.signup.palette];
  const themeValue = theme.colors[value];

  if (themeValue) {
    return themeValue;
  }

  return value;
}

const SignupButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[9]};
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.size[18]};
  font-weight: ${({ theme }) => theme.fonts.weight.black};
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => pickColor(colorMap.buttonCopy, theme)};
  background: ${({ theme }) => pickColor(colorMap.buttonBackground, theme)};
  border: 2px solid ${({ theme }) => pickColor(colorMap.buttonBorder, theme)};
  cursor: pointer;

  ${({ theme }) => theme.signup.direction === COLUMN_DIRECTION && css`
    margin-bottom: ${theme.spacing[1]};
  `}

  &:hover {
    color: ${({ theme }) => pickColor(colorMap.buttonCopy.hover, theme)};
    background: ${({ theme }) => pickColor(colorMap.buttonBackground.hover, theme)};
    border: 2px solid ${({ theme }) => pickColor(colorMap.buttonBorder.hover, theme)};
  }
`;

export default function Signup(props) {
  const {
    defaultCallToAction,
    defaultSignupButtonLabel,
    defaultMobilizeEventLink,
  } = useContent();

  const {
    palette = RED_PALETTE,
    direction = ROW_DIRECTION,
    callToAction = defaultCallToAction,
    buttonLabel = defaultSignupButtonLabel,
    signupLink = defaultMobilizeEventLink,
  } = props;

  const signupTheme = (theme) => ({ ...theme, signup: { palette, direction } });

  return (
    <ThemeProvider theme={signupTheme}>
      <Container>
        <Content>
          <Header>{callToAction}</Header>
          <SignupButton href={signupLink}>{buttonLabel}</SignupButton>
        </Content>
      </Container>
    </ThemeProvider>
  );
}
