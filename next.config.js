const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

require("dotenv").config();

module.exports = withNextra({
  env: {
    FORMBEE_API_KEY: process.env.FORMBEE_API_KEY,
  },
});
