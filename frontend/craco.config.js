const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (config) => {
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer"),
        util: require.resolve("util"),
        assert: require.resolve("assert"),
        process: require.resolve("process/browser"),
      };

      config.plugins = [
        ...(config.plugins || []),
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
          process: ["process"],
        }),
      ];

      // Чтобы убрать тонны source-map варнингов из @reown/*
      config.ignoreWarnings = [/Failed to parse source map/];

      return config;
    },
  },
};
