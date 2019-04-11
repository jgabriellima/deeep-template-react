/* eslint-disable max-len */

module.exports = {
  // Node.js app
  port: process.env.PORT || 3000,

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl: process.env.API_SERVER_URL || `http://localhost:${process.env.PORT || 3000}`,
  },

  // Database
  databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.REACT_GOOGLE_TRACKING_ID,
  },

  defaultMeta: {
    title: 'Deeep Marketing',
    description: 'Transforming your Business with Artificial Intelligence',
  },

  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'DeeepMarketing' },
  },
};
