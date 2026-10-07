import sql from 'mssql';
import { config } from '../config/index.js';

let pool;

export async function getPool() {
  if (pool && pool.connected) return pool;
  pool = await sql.connect(config.db);
  return pool;
}

/**
 * Parameterized query. Semua binding input WAJIB lewat params
 * (menggantikan interpolasi string di M_hris/hris.php yang rawan injection).
 */
export async function query(text, params = {}) {
  const p = await getPool();
  const request = p.request();
  for (const [name, value] of Object.entries(params)) {
    request.input(name, value);
  }
  const result = await request.query(text);
  return result.recordset;
}

export async function queryOne(text, params = {}) {
  const rows = await query(text, params);
  return rows[0] ?? null;
}

/** Untuk batch multi-statement (generate_cuti mengirim 2 insert sekaligus). */
export async function execute(text, params = {}) {
  const p = await getPool();
  const request = p.request();
  for (const [name, value] of Object.entries(params)) {
    request.input(name, value);
  }
  return request.query(text);
}

export { sql };
