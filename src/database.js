import pg from 'pg';

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'food',
  password: 'postgres',
  port: 5436,
});

export default pool;
