export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC,
  },
});
