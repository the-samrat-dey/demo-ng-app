module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // feature
        'fix',  // fix
        'docs', // documentation
        'style', // style changes (formatting, etc.)
        'refactor', // refactor
        'test', // tests
        'chore' // maintenance tasks
      ]
    ],
    'subject-empty': [2, 'never'],
    'subject-case': [2, 'always', 'lower-case'], // Subject in lower-case
    'header-max-length': [2, 'always', 100], // Limit header length
    'body-max-length': [2, 'always', 1000], // Limit body length
    'footer-empty': [2, 'never'],
    'footer-max-length': [2, 'always', 1000], // Limit footer length
    'type-case': [2, 'always', 'lower-case'], // Type should be in lowercase
    'subject-full-stop': [2, 'never', '.'], // No full stop at the end of subject
    'references-empty': [2, 'never']
  }
};
