import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const themeTokensPath = path.join(projectRoot, 'src/shared/theme/tokens.ts');
const themeCssPath = path.join(projectRoot, 'src/shared/theme/theme.css');
const srcPath = path.join(projectRoot, 'src');

const getThemeTokenKeys = (source) => {
  const interfaceMatch = source.match(/export interface ThemeTokens\s*{([\s\S]*?)^}/m);

  if (interfaceMatch === null) {
    throw new Error('Could not find ThemeTokens interface.');
  }

  return [...interfaceMatch[1].matchAll(/'([^']+)': string;/g)].map((match) => match[1]);
};

const getCssVarKeys = (source) => {
  return [...source.matchAll(/--([a-z0-9-]+)\s*:/gi)].map((match) => match[1]);
};

const getCssVarUsages = (source) => {
  return [...source.matchAll(/var\(--([a-z0-9-]+)/gi)].map((match) => match[1]);
};

const getCssFiles = async (directoryPath) => {
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directoryPath, entry.name);

      if (entry.isDirectory()) {
        return getCssFiles(entryPath);
      }

      return entry.isFile() && entry.name.endsWith('.css') ? [entryPath] : [];
    }),
  );

  return files.flat();
};

const getMissingEntries = (left, right) => {
  const rightSet = new Set(right);

  return left.filter((entry) => !rightSet.has(entry));
};

const reportAndExit = (messages) => {
  if (messages.length === 0) {
    console.log('Theme token audit passed.');
    process.exit(0);
  }

  console.error('Theme token audit failed:\n');

  messages.forEach((message) => {
    console.error(`- ${message}`);
  });

  process.exit(1);
};

const main = async () => {
  const [themeTokensSource, themeCssSource, cssFiles] = await Promise.all([
    readFile(themeTokensPath, 'utf8'),
    readFile(themeCssPath, 'utf8'),
    getCssFiles(srcPath),
  ]);

  const themeTokenKeys = getThemeTokenKeys(themeTokensSource);
  const themeCssKeys = getCssVarKeys(themeCssSource);
  const contractMessages = [];

  const tokensMissingInCss = getMissingEntries(themeTokenKeys, themeCssKeys);
  const cssMissingInTokens = getMissingEntries(themeCssKeys, themeTokenKeys);

  if (tokensMissingInCss.length > 0) {
    contractMessages.push(`Defined in ThemeTokens but missing in theme.css: ${tokensMissingInCss.join(', ')}`);
  }

  if (cssMissingInTokens.length > 0) {
    contractMessages.push(`Defined in theme.css but missing in ThemeTokens: ${cssMissingInTokens.join(', ')}`);
  }

  const themeTokenSet = new Set(themeTokenKeys);
  const usageMessages = [];

  for (const cssFilePath of cssFiles) {
    const cssSource = await readFile(cssFilePath, 'utf8');
    const localCssVars = new Set(getCssVarKeys(cssSource));
    const cssVarUsages = new Set(getCssVarUsages(cssSource));
    const undefinedVars = [...cssVarUsages].filter((usage) => !themeTokenSet.has(usage) && !localCssVars.has(usage));

    if (undefinedVars.length > 0) {
      const relativePath = path.relative(projectRoot, cssFilePath);
      usageMessages.push(`${relativePath}: undefined vars -> ${undefinedVars.join(', ')}`);
    }
  }

  reportAndExit([...contractMessages, ...usageMessages]);
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
