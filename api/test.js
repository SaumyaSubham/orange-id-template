// Simple API route for testing server functionality
module.exports = (req, res) => {
  res.json({
    message: 'API is working!',
    serverTime: new Date().toISOString(),
    env: {
      nodeEnv: process.env.NODE_ENV,
      hasSessionSecret: !!process.env.SESSION_SECRET,
      hasTenantId: !!process.env.VITE_BEDROCK_TENANT_ID
    }
  });
};