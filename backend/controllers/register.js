import express from 'express';
import pool from './dbConfig';
import bcrypt from "bcrypt";

exports.Register =async function register(req,res) {
 const { CustomerDetails } = req.body;  
    console.log(CustomerDetails.lastName);
    let Query2, Query1;
    let hashedPassword = await bcrypt.hash(CustomerDetails.password,10);
    Query1=  await pool.query("select email from user where email=$1 ",[CustomerDetails.email]);
    if(!Query1.rows.length)
    {   Query2 = await pool.query(
        "INSERT INTO user values(default,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",[CustomerDetails.firstName,CustomerDetails.lastName, CustomerDetails.email, hashedPassword,CustomerDetails.mobileNumber,CustomerDetails.DOB,CustomerDetails.street_address,CustomerDetails.city,CustomerDetails.region,CustomerDetails.city_pincode]
    );}
}

