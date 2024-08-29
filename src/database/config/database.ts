import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'zaxscdv98',
  database: process.env.DB_NAME || 'measuresdb',
  host: process.env.DB_HOST || 'db',
  port: Number(process.env.DB_PORT) || 3306,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
}

export = config;