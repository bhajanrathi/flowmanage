import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: "ep-red-cell-a1s61331-pooler.ap-southeast-1.aws.neon.tech",
  user: "neondb_owner",
  password: "npg_oksUlgxT53qQ",
  database: "neondb",
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

export default pool;
