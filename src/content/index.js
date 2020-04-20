// @WARNING: Do not change this file to edit site copy. Only edit '.txt' files.

import form from './form.text';
import hero from './hero.text';
import nav from './nav.text';

const content = {};

function evaluateText(text) {
  const lines = text.split('\n');

  let target = null;

  lines.forEach((line) => {
    if (line.startsWith('@')) {
      target = line.replace('@', '').trim();
      content[target] = '';
    } else if (!!target && typeof content[target] === 'string') {
      if (!!line.trim().length) {
        if (!!content[target].length) {
          content[target] += '\n';
        }

        content[target] += line;
      }
    }
  });
}

evaluateText(form);
evaluateText(hero);
evaluateText(nav);

export default content;
