module.exports = {
  stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    'storybook-addon-themes',
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false // 👈 disable the backgrounds addon
      }
    },
    '@storybook/addon-interactions',
    'storybook-addon-mock'
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5'
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript-plugin'
  }
}
