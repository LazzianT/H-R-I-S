import 'dotenv/config';

const bool = (v, d = false) => (v === undefined ? d : String(v).toLowerCase() === 'true');

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  corsOrigin: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',').map((s) => s.trim()),
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-secret-change-me',
    expires: process.env.JWT_EXPIRES || '12h',
  },
  db: {
    server: process.env.DB_SERVER || 'localhost',
    port: Number(process.env.DB_PORT || 1433),
    database: process.env.DB_NAME || 'BMC',
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || '',
    options: {
      encrypt: bool(process.env.DB_ENCRYPT, false),
      trustServerCertificate: bool(process.env.DB_TRUST_SERVER_CERTIFICATE, true),
      enableArithAbort: true,
    },
    pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
  },
  wa: {
    baseUrl: process.env.WA_BASE_URL || 'http://localhost/api/send.php',
    token: process.env.WA_TOKEN || '',
  },
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  publicDir: process.env.PUBLIC_DIR || './public',
};
