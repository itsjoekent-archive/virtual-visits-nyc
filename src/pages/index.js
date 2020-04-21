import React from 'react';
import styled from 'styled-components';
import Hero from '../components/Hero';
import Signup from '../components/Signup';
import content from '../content';

export default function Homepage() {
  return (
    <React.Fragment>
      <Hero />
      <Signup />
    </React.Fragment>
  );
}
