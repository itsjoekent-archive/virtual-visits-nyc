import fs from 'fs';
import path from 'path';

import React from 'react';
import styled, { css } from 'styled-components';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Phone from '../art/Phone';

export default function _404(props) {

}

export async function getStaticProps(context) {
  const content = await loadManyContentFiles(fs, path, [
    'pages/404',
    'components/nav',
    'components/footer',
  ]);

  return {
    props: {
      content,
    },
  }
}
