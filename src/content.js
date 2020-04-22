import { createContext, useContext } from 'react';

export const ContentContext = createContext({});

export function useContent() {
  const content = useContext(ContentContext);

  return content;
}

export function parseContent(text) {
  const content = {};

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

  return content;
}

export async function loadContentFile(fs, path, file) {
  const fsPromises = fs.promises;

  const filePath = path.join(process.cwd(), 'content', `${file}.txt`);
  const fileContents = await fsPromises.readFile(filePath, 'utf8');

  return parseContent(fileContents);
}

export async function loadManyContentFiles(fs, path, files) {
  const result = await Promise.all(files.map((file) => loadContentFile(fs, path, file)));

  return result.reduce((acc, data) => ({ ...acc, ...data }), {});
}

export function loadAllPagePaths(fs, path) {
  const postsDirectory = path.join(process.cwd(), 'content/pages');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((name) => `${name.replace('.txt', '')}`);
}
