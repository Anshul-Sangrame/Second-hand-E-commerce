import pool from "../database/db.js";
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });

export default async function deleteItem(req,res)
{
    const client = await pool.connect();
    try { 
        await client.query('BEGIN');
        const id = req.body.id;

        const preparedStmt = {
            text: "DELETE from products \
                    Where id = $1 \
                    RETURNING owner_id, public_id",
            values: [id]
        }

        const result = await pool.query(preparedStmt);

        if (result.rowCount === 0)
        {
            res.send("ok");
            await client.query('COMMIT');
            return;
        }

        const realUserId = result.rows[0].owner_id;
        const public_id = result.rows[0].public_id;

        if (req.user_id !== realUserId)
        {
            const e = new Error("your user id does not match with product user_id");
            e.name = "UserError";
            throw e;
        } 

        if (!public_id)
        {
            res.send("ok");
            await client.query('COMMIT');
            return;
        }

        await cloudinary.uploader.destroy(public_id);
        res.send('ok');
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        console.log(err.name + ": " + err.message);
        if (err.name === "UserError")
        {
            res.status(401).send(err.message);
        }
        else
        {
            res.status(500).send("server error");
        }
    }
    finally
    {
        client.release();
    }
}