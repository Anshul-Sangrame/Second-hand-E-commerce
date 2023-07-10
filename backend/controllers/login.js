import pool from '../database/db.js'
import jwtGenerator from './token_generator.js'
import bcrypt from 'bcrypt'

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