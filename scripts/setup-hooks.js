const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Run husky init to set up Git hooks
execSync('ng analytics off', { stdio: 'inherit' });

// Run husky init to set up Git hooks
execSync('npx husky', { stdio: 'inherit' });

// Path to the pre-commit hook file
const preCommitHookPath = path.resolve('.husky', 'pre-commit');

// Create or overwrite the pre-commit hook file with the desired script
const preCommitScript = `# Run lint-staged to lint and format code before commit
npx --no-install lint-staged
if [ $? -ne 0 ]; then
  # For Unix-like systems (bash, zsh, etc.)
  if [ -t 1 ]; then
    echo "\\033[1;31m❌ Commit rejected! Linting or formatting failed. Please fix the errors and try again.\\033[0m"
  else
    echo "❌ Commit rejected! Linting or formatting failed. Please fix the errors and try again."
  fi
  exit 1
fi
`;

// Ensure .husky directory exists
if (!fs.existsSync(path.resolve('.husky'))) {
  console.error('❌ .husky directory not found! Please create the .husky directory first.');
  process.exit(1); // Exit the script with an error code
}

// Write the pre-commit hook script
fs.writeFileSync(preCommitHookPath, preCommitScript, 'utf8');

// Check if we're on a Unix-like system (macOS/Linux) and only run chmod there
if (process.platform !== 'win32') {
  try {
    console.log('✅ Setting execute permissions on pre-commit hook...');
    execSync(`chmod +x ${preCommitHookPath}`, { stdio: 'inherit' });
  } catch (err) {
    console.error('❌ Error setting execute permissions in your Unix-like system.');
    process.exit(1);
  }
}

console.log('✅ Husky pre-commit hook setup with lint-staged completed!');
