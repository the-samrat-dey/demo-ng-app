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

// Run lint-staged with configuration
import('lint-staged').then(lintStaged => {
  lintStaged.default(lintStagedConfig).catch(() => {
    console.error(
      chalk.bold.red(
        '❌ Commit rejected! Linting or formatting failed. Please fix the errors and try again.'
      )
    );
    process.exit(1);
  });
});
