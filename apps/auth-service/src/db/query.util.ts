import { pool } from './db.util'

export const executeQuery = async (
  query: string,
  params?: any[]
) => {
  return pool.query(query, params)
}
