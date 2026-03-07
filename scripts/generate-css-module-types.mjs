import { promises as fs } from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const sourceRoot = path.join(projectRoot, 'src');

const isCssModule = (filePath) => filePath.endsWith('.module.css');

const toPosix = (value) => value.split(path.sep).join('/');

const getCssModuleFiles = async (directoryPath) => {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const filePaths = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(directoryPath, entry.name);

      if (entry.isDirectory()) {
        return getCssModuleFiles(absolutePath);
      }

      return isCssModule(absolutePath) ? [absolutePath] : [];
    }),
  );

  return filePaths.flat();
};

const getClassNames = (cssSource) => {
  const classNames = new Set();
  const classPattern = /(?:^|[\s,{])\.([_a-zA-Z][-_a-zA-Z0-9]*)/gm;

  let match = classPattern.exec(cssSource);
  while (match !== null) {
    const className = match[1];
    if (className !== undefined) {
      classNames.add(className);
    }

    match = classPattern.exec(cssSource);
  }

  return Array.from(classNames).sort((left, right) => left.localeCompare(right));
};

const getTypeDeclaration = (classNames) => {
  const lines = [
    'declare const styles: {',
    ...classNames.map((className) => `  readonly '${className}': string;`),
    '};',
    '',
    'export default styles;',
    '',
  ];

  return lines.join('\n');
};

const writeDeclarationForCssModule = async (cssModulePath) => {
  const cssSource = await fs.readFile(cssModulePath, 'utf8');
  const classNames = getClassNames(cssSource);
  const typeDeclaration = getTypeDeclaration(classNames);
  const declarationPath = `${cssModulePath}.d.ts`;

  await fs.writeFile(declarationPath, typeDeclaration, 'utf8');
};

const run = async () => {
  const cssModuleFiles = await getCssModuleFiles(sourceRoot);

  await Promise.all(cssModuleFiles.map((filePath) => writeDeclarationForCssModule(filePath)));

  const relativeFiles = cssModuleFiles.map((filePath) => toPosix(path.relative(projectRoot, filePath)));
  process.stdout.write(`Generated CSS module types for ${relativeFiles.length} files.\n`);
};

await run();
