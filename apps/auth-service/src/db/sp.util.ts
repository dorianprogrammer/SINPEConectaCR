import { pool } from './db.util.js';

export const executeSP = async (spName: string, params: any[]) => {
  const placeholders = params.map((_, i) => `$${i + 1}`).join(', ');
  const query = `SELECT * FROM ${spName}(${placeholders});`;
  return pool.query(query, params);
};
