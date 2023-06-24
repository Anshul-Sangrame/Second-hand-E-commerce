import pool from '../database/db.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config();

function jwtGenerator(userid)
{
    const payload = {
        user: userid
    }
    return jwt.sign(payload,process.env.SECRET,{ expiresIn: '1hr'})
}

export default async function login(req,res)
{
    try {
        /* 
        req.body = {username,password}
        */

        const {email:email, password:password} = req.body;
        const preparedStmt = {
            text: "Select id,password from users \
                    Where email = $1",
            values: [email]
        }

        const result = await pool.query(preparedStmt);

        if (result.rowCount === 0)
        {
            res.status(401).json({msg: "wrong email"});
            return;
        }

        const hashPassword = result.rows[0].password;
        const userId = result.rows[0].id;

        const match = await bcrypt.compare(password,hashPassword);
        if (match)
        {
            const token = jwtGenerator(userId);
            res.json({token});
            return;
        }
        res.status(401).json({msg: "wrong password"});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "server error"});
    }
}