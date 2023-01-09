import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: Number(process.env.PORT) || 3000,
  secret: process.env.JWT_SECRET,
  accessTokenExpiresIn: Number(process.env.JWT_EXPIRES_IN),
  refreshTokenExpiresIn: 30 * Number(process.env.JWT_EXPIRES_IN),
  connection: process.env.DATABASE_URL || {
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
  },
  client: process.env.CLIENT,
}));
