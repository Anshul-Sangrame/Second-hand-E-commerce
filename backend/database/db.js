import pg from 'pg';
const Pool = pg.Pool;


const pool = new Pool ({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "secondecommerce"
})

export default pool;