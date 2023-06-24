import pool from '../database/db.js'
import bcrypt from "bcrypt";

export default async function register(req, res) {
    try {
        const { CustomerDetails } = req.body;
        // console.log(CustomerDetails.lastName);
        let Query2, Query1;
        let hashedPassword = await bcrypt.hash(CustomerDetails.password, 10);
        Query1 = await pool.query("select email from users where email=$1 ", [CustomerDetails.email]);
        console.log(Query1.rows.length);
        if (!Query1.rows.length) {
            Query2 = await pool.query(
                "INSERT INTO users(first_name,last_name,email,password,phone,DOB,address,city,state) values($1,$2,$3,$4,$5,$6,$7,$8,$9)", [CustomerDetails.firstName, CustomerDetails.lastName, CustomerDetails.email, hashedPassword, CustomerDetails.mobileNumber, CustomerDetails.DOB, CustomerDetails.address, CustomerDetails.city, CustomerDetails.state]
            );
            res.json({msg: "ok"});
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
