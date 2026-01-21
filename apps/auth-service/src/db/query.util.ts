import { pool } from './db.util.js'

export const executeQuery = async (
  query: string,
  params?: any[]
) => {
  return pool.query(query, params)
}
