import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { httpError } from '../lib/http.js';

export function signToken(user) {
  return jwt.sign(
    { sub: user.username, name: user.name ?? user.username, role: user.role ?? 'hr' },
    config.jwt.secret,
    { expiresIn: config.jwt.expires }
  );
}

/** Ganti cek session user='Admin' pada controller lama. */
export function requireAuth(req, _res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return next(httpError(401, 'Unauthorized'));
  try {
    req.user = jwt.verify(token, config.jwt.secret);
    next();
  } catch {
    next(httpError(401, 'Invalid or expired token'));
  }
}
