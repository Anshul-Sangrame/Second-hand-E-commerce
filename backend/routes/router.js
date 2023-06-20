import { Router } from "express";
import VerifyToken from "../controllers/verifyToken.js";
import login from "../controllers/login.js";
const register = require("../controllers/register.js");
import pool from "../database/db.js";
import bcrypt from 'bcrypt'

const router = Router()

// Verifies JWT tokens
router.use(VerifyToken);

// routes
router.post('/login', login)
router.post('/')
router.post('/register',async(req,res) => {register.Register(req,res) });
router.get('/verify', (req,res) => {
    try {
        
        if (req.user_id) {
            return res.json({id: req.user_id});
        }
        console.log("unauthorized")
        return res.status(401).send("unauthorized")
    } catch (err) {
        console.error(err.message);
    }
})

// testing

router.post('/test', async (req, res) => {
    try {
        /*
        req.body = {name,email,username,password}
        */
        const {name,email,username,password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const Hashedpassword = await bcrypt.hash(password,salt)
        const preparedStmt = {
            text: "Insert into users(name,email,username,password) values($1,$2,$3,$4) returning *",
            values: [name,email,username,Hashedpassword]
        }
        const result = await pool.query(preparedStmt);

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        if (err.message === 'duplicate key value violates unique constraint "users_name_key"')
        {
            res.status(401).send("duplicate");
        }
    }
})

export default router;
