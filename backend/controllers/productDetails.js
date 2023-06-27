import pool from "../database/db.js"

export default async function productDetails(req,res)
{
    try {

        if (!req.user_id)
        {
            return res.json({data:null})
        }
        const id = req.params.id
        const preparedStmt = {
            text: "SELECT P.*, U.first_name, U.last_name, U.address, U.city, U.state, U.phone \
                    FROM products AS P JOIN users AS U on P.owner_id = U.id \
                    WHERE  P.id=$1",
            values: [id]
        }
        const result = await pool.query(preparedStmt);
        return res.json({data: result.rows[0]});

    } catch (err) {
        console.error(err.message)
        res.status(500).json({data: null});
    }
}