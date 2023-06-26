import pool from "../database/db.js"

export default async function productDetails(req,res)
{
    try {

        // if (!req.user_id)
        // {
        //     return res.json({data:null})
        // }
        const id = req.params.id
        const preparedStmt = {
            text: "SELECT * \
                    FROM products \
                    WHERE id=$1",
            values: [id]
        }
        const result = await pool.query(preparedStmt);
        return res.json({data: result.rows[0]});

    } catch (err) {
        console.error(err.message)
        res.status(500).json({data: null});
    }
}