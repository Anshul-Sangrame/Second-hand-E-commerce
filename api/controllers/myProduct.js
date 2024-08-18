import pool from "../database/db.js";

export default async function myProducts(req,res)
{
    try {
        const id = req.user_id;
        const preparedStmt = {
            name: 'get-myProducts',
            text: 'SELECT P.id, tag, title, cost, views, image_url, qty FROM products AS P JOIN users as U on U.id = P.owner_id \
            WHERE U.id = $1 \
            ORDER BY views DESC LIMIT 10',
            values: [id] 
        }

        const result = await pool.query(preparedStmt);

        res.json({ data: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
}