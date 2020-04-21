import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useContent } from '../content';

const NavigationContainer = styled.nav`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndexes.nav};
`;

const NavigationContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: ${({ theme }) => theme.max.site};
  margin-left: auto;
  margin-right: auto;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[3]};
`;

const Logo = styled.a`
  img {
    display: block;
    width: 100%;
  }
`;

const LinksContainer = styled.div`
  display: none;

  @media ${({ theme }) => theme.media.tablet} {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Link = styled.a`
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.size[14]};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;
  padding-right: ${({ theme }) => theme.spacing[4]};

  &:last-of-type {
    padding-right: 0;
  }
`;

const takeoverToggleLineShared = css`
  width: 16px;
  height: 2px;
  border-radius: 4px;
  background-color: ${({ isTakeoverOpen, theme }) => isTakeoverOpen ? theme.colors.white : theme.colors.black};
`;

const TakeoverToggleIcon = styled.span`
  position: absolute;
  left: -24px;
  display: block;

  ${takeoverToggleLineShared}

  ${({ theme, isTakeoverOpen }) => isTakeoverOpen && css`
    transform: rotate(45deg);
    left: -22px;

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      ${takeoverToggleLineShared}
      transform: rotate(90deg);
    }
  `}

  ${({ theme, isTakeoverOpen }) => !isTakeoverOpen && css`
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: -6px;
      left: 0;
      ${takeoverToggleLineShared}
    }

    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 6px;
      left: 0;
      ${takeoverToggleLineShared}
    }
  `}
`;

const TakeoverToggle = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.size[18]};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  line-height: 1;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  border: none;
  padding: 0;
  margin: 0;
  background: none;

  @media ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`;

const TakeoverNavigationRow = styled(NavigationContent)`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const fadeInFrames = keyframes`
  0% { opacity: 0 }
  100% { opacity: 1 }
`;

const fadeOutFrames = keyframes`
  0% { opacity: 1 }
  100% { opacity: 0 }
`;

const fadeDuration = 500;

const TakeoverContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndexes.navTakeover};
  width: 100%;
  overflow: hidden;

  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.black};

  display: ${({ isTakeoverOpen, isTakeoverFading }) => isTakeoverOpen || isTakeoverFading ? 'flex' : 'none'};

  ${({ isTakeoverFading, isTakeoverOpen }) => isTakeoverFading && css`
    animation: ${fadeDuration}ms forwards ${isTakeoverOpen ? fadeInFrames : fadeOutFrames};
  `}

  ${TakeoverToggle} {
    color: ${({ theme }) => theme.colors.white};
  }

  ${LinksContainer} {
    display: flex;
    flex-direction: column;
    padding-left: ${({ theme }) => theme.spacing[7]};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }

  ${Link} {
    font-size: ${({ theme }) => theme.fonts.size[28]};
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }

  @media ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`;

function mapContentString(input, content) {
  return (input || '')
    .trim()
    .split(',')
    .map((varName) => content[varName]);
}

export default function Navigation() {
  const content = useContent();

  const {
    menuButtonLabel,
    takeoverCloseLabel,
    logoAltText,
    navLabels: navLabelsStringified = '',
    navLinks: navLinksStringified = '',
  } = content;

  const navLabels = mapContentString(navLabelsStringified, content);
  const navLinks = mapContentString(navLinksStringified, content);

  const takeoverRef = React.useRef(null);

  const [isTakeoverOpen, setIsTakeoverOpen] = React.useState(false);
  const [isTakeoverFading, setIsTakeoverFading] = React.useState(false);

  React.useEffect(() => {
    if (!isTakeoverFading) {
      return () => {};
    }

    const timeoutId = setTimeout(() => {
      setIsTakeoverFading(false);
    }, fadeDuration);

    return () => clearTimeout(timeoutId);
  }, [isTakeoverFading, setIsTakeoverFading]);

  React.useEffect(() => {
    function onClick(event) {
      if (
        takeoverRef.current
        && isTakeoverOpen
        && !event.target.contains(takeoverRef.current)
      ) {
        toggleTakeover();
      }
    }

    document.addEventListener('click', onClick);

    return () => document.removeEventListener('click', onClick);
  }, [isTakeoverOpen, setIsTakeoverOpen, takeoverRef.current]);

  function toggleTakeover() {
    setIsTakeoverOpen(!isTakeoverOpen);
    setIsTakeoverFading(true);
  }

  return (
    <React.Fragment>
      <NavigationContainer>
        <NavigationContent>
          <Logo href="/">
            <img src="/logo.png" alt={logoAltText} />
          </Logo>
          <TakeoverToggle onClick={toggleTakeover}>
            <TakeoverToggleIcon isTakeoverOpen={isTakeoverOpen} />
            {menuButtonLabel}
          </TakeoverToggle>
          <LinksContainer>
            {navLabels.map((label, index) => (
              <Link key={label} href={navLinks[index]}>{label}</Link>
            ))}
          </LinksContainer>
        </NavigationContent>
      </NavigationContainer>
      <TakeoverContainer
        isTakeoverOpen={isTakeoverOpen}
        isTakeoverFading={isTakeoverFading}
        ref={takeoverRef}
      >
        <TakeoverNavigationRow>
          <Logo href="/">
            <img src="/logo-light.png" alt={logoAltText} />
          </Logo>
          <TakeoverToggle onClick={toggleTakeover}>
            <TakeoverToggleIcon isTakeoverOpen={isTakeoverOpen} />
            {takeoverCloseLabel}
          </TakeoverToggle>
        </TakeoverNavigationRow>
        <LinksContainer>
          {navLabels.map((label, index) => (
            <Link key={label} href={navLinks[index]}>{label}</Link>
          ))}
        </LinksContainer>
      </TakeoverContainer>
    </React.Fragment>
  );
}
