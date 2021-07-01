
const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-css-modules-preset",
    "@storybook/preset-scss",
  ],
  webpackFinal: async (config) => {
    console.log(__dirname)
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, "../src"),
    ];
    
    config.module.rules.push({
      test: /\.css?$/,
      loaders: [ 'style', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' ],
      include: __dirname
    },
    {
      test: /\.scss$/,
      loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      include: __dirname
    });

    return config;
  },
}

