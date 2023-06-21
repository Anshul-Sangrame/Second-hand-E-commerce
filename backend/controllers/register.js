const express = require('express');
const pool = require('./dbConfig');
const bcrypt = require("bcrypt");

exports.Register =async function register(req,res) {
    const { firstName,lastName, email, password,mobileNumber,DOB,street_address,city,region,city_pincode } = req.body;  
    let Query2, Query1 ;
    let hashedPassword = await bcrypt.hash(password,10);
    Query1=  await pool.query("select email from user where email=$1 ",[email]);

    if(!Query1.rows.length)
    {   Query2 = await pool.query(
        "INSERT INTO user values(default,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",[firstName,lastName, email, hashedPassword,mobileNumber,DOB,street_address,city,region,city_pincode]
    );
    
    }
}

