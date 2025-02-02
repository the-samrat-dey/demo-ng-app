import { createRequire } from 'module';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

import chalk from 'chalk';

// Create a require function for loading packages (ES modules)
const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url)); // Get current script directory
const projectRoot = resolve(__dirname, '..');

// Check if required packages are available
try {
  require.resolve('lint-staged');
  require.resolve('chalk');
} catch (error) {
  console.error('Required packages are missing. Please run "npm install" first.');
  process.exit(1);
}

// Configure lint-staged options
const lintStagedConfig = {
  allowEmpty: false, // Fail if there are no staged files
  relative: true, // Use relative paths
  concurrent: true, // Run tasks concurrently when possible
  maxArgLength: null, // Don't limit command line arguments
  configPath: resolve(projectRoot, '.lintstagedrc.json')
};

console.log(resolve(projectRoot, '.lintstagedrc.json'));

async function runLintStaged() {
  try {
    const lintStaged = await import('lint-staged');

    const lintStagedConfig = {
      allowEmpty: false,
      relative: true,
      concurrent: true,
      maxArgLength: null,
      configPath: resolve(projectRoot, '.lintstagedrc.json')
    };

    const success = await lintStaged.default(lintStagedConfig);

    if (!success) {
      console.error('\x1b[1m\x1b[31m%s\x1b[0m', '❌ Lint errors found. Fix them before committing.');

      process.exit(1);
    }
  } catch (error) {
    console.error('\x1b[1m\x1b[31m%s\x1b[0m', '❌ Failed to run lint-staged.');
    console.error(error);
    process.exit(1);
  }
}

runLintStaged();
