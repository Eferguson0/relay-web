module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-tailwindcss'
  ],
  rules: {
    // Allow Tailwind CSS at-rules
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer',
          'theme',
          'import'
        ]
      }
    ],
    // Allow CSS custom properties
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes']
      }
    ],
    // Allow CSS functions
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['theme', 'screen']
      }
    ],
    // Disable rule-empty-line-before for nested rules
    'rule-empty-line-before': null,
    // Disable custom-property-empty-line-before
    'custom-property-empty-line-before': null,
    // Allow short hex colors
    'color-hex-length': 'long'
  }
};
