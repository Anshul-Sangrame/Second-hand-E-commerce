import pool from '../database/db.js'
import bcrypt from "bcrypt";
import jwtGenerator from './token_generator.js';

export default async function register(req, res) {
    try {
        const { CustomerDetails } = req.body;
        // console.log(CustomerDetails.lastName);
        let Query2, Query1;
        let hashedPassword = await bcrypt.hash(CustomerDetails.password, 10);
        Query1 = await pool.query("select email from users where email=$1 ", [CustomerDetails.email]);
        
        if (!Query1.rows.length) {
            Query2 = await pool.query(
                "INSERT INTO users(first_name,last_name,email,password,phone,DOB,address,city,state) values($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id", [CustomerDetails.firstName, CustomerDetails.lastName, CustomerDetails.email, hashedPassword, CustomerDetails.mobileNumber, CustomerDetails.DOB, CustomerDetails.address, CustomerDetails.city, CustomerDetails.state]
            );
            
            const token = jwtGenerator(Query2.rows[0].id);
            res.json({msg: "ok",token: token});
        }
        else
        {
            res.status(401).json({msg: "email already exists"});
        }

        console.log("registration done");
    } catch (err) {
        console.error(err.message)
    }
}
