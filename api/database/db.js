import pg from 'pg';
import 'dotenv/config';
const Pool = pg.Pool;


const pool = new Pool ({
    user: process.env.db_user,
    password: process.env.db_password,
    host: process.env.db_hostname,
    port: process.env.db_port,
    database: process.env.db_name
})

export default pool;