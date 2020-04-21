module.exports = {
  devIndicators: {
    autoPrerender: false,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        { loader: 'babel-loader' },
        { loader: 'react-svg-loader' },
      ],
    });

    return config;
  },
}
