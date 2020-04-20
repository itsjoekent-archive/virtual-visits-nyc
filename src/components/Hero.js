import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing['7']};
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.orange.primary};
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  max-width: ${({ theme }) => theme.max.dual};
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${({ theme }) => theme.max.dual}) {
    padding-left: ${({ theme }) => theme.spacing['10']};
    padding-right: ${({ theme }) => theme.spacing['10']};
  }
`;

export default function Hero() {
  return (
    <Section>
      <Container />
    </Section>
  );
}
