import { Router } from "express";
import VerifyToken from "../controllers/verifyToken.js";
import login from "../controllers/login.js";
import register from "../controllers/register.js";
import { EditProfileGet, EditProfilePost } from "../controllers/EditProfile.js";
import pool from "../database/db.js";
import bcrypt from 'bcrypt'
import productDetails from "../controllers/productDetails.js";
import myProducts from "../controllers/myProduct.js";
import Sell from "../controllers/sell.js";
import multer from  'multer'


const router = Router();
export const publicRouter = Router();

// multer config
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
      const uniqueSuffix = Math.round(Math.random() * 1E9)
      const extension = file.mimetype.split('/')[1];
      cb(null, file.fieldname + "-" + req.user_id + "." + extension);
    }
  })

const upload = multer({storage: storage});

// Verifies JWT tokens
router.use(VerifyToken);

// public routes
publicRouter.post('/login', login)
publicRouter.post('/register', register)
// Private
router.post('/sell',upload.single('file'), Sell);
router.get('/editprofile', EditProfileGet)
router.post('/editprofile', EditProfilePost)
router.post('/register', async (req, res) => { register.Register(req, res) });
router.get('/verify', (req, res) => {
    try {
        res.json({ id: req.user_id });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})
router.get('/myProducts', myProducts);
router.get('/productDetails/:id', productDetails);

// homepage
router.get('/home', async (req, res) => {
    try {
        if (req.user_id) {
            const result = await pool.query('SELECT id, tag, title, cost, views, image_url, qty FROM products ORDER BY views DESC LIMIT 10');
            return res.json({ data: result.rows });
        }
        return res.json(null);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

// testing

publicRouter.get('/hashAll', async (req, res) => {
    try {
        let preparedStmt = {
            text: "SELECT id,password from users"
        }

        const result = await pool.query(preparedStmt);

        for (let item of result.rows) {
            if (item.password === "hashed_password") {
                const salt = await bcrypt.genSalt(10);
                const Hashedpassword = await bcrypt.hash(item.password, salt)
                preparedStmt = {
                    text: "UPDATE users \
                            SET password = $1 \
                            WHERE id=$2",
                    values: [Hashedpassword, item.id]
                }
                await pool.query(preparedStmt);
            }
        }
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})

export default router;
