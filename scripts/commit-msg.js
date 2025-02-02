const fs = require('fs');
const path = require('path');

// Get the commit message file
const commitMsgPath = process.argv[2];
const commitMsg = fs.readFileSync(commitMsgPath, 'utf-8').trim();

// Define the color codes for cross-platform usage
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m',
};

// Define the regex for validating the commit message format
const commitMessageRegex = /^(feat|fix|docs|style|refactor|chore|test): #\d+ .+/;

// Function to display the error message and guidelines
const displayErrorMessage = () => {
  console.log(`${colors.red}ERROR: Commit message format is invalid!${colors.reset}`);
  console.log(`${colors.yellow}Correct format: <type>: #<task-number> <message>${colors.reset}`);
  console.log(`${colors.green}Example: feat: #1234 Add new login feature${colors.reset}`);
  console.log(`${colors.green}Valid Types are: feat, fix, docs, style, refactor, chore, test${colors.reset}`);
  console.log(`${colors.green}Please refer to the guidelines for more information!${colors.reset}`);
};

// Validate the commit message
if (!commitMessageRegex.test(commitMsg)) {
  displayErrorMessage();
  process.exit(1); // Reject the commit
}
