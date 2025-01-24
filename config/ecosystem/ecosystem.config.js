module.exports = {
  apps: [
    {
      name: 'dev',
      script: './dist/src/main.js',
      env: {
        NODE_ENV: 'dev',
      },
    },
  ],
};
