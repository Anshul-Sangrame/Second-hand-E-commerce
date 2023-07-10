import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export default function VerifyToken(req,res,next)
{
    try {
        const token = req.header("token");
        const payload = jwt.verify(token,process.env.SECRET);
        req.user_id = payload.user;

        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).send("Invalid token");
    }
    finally {
        console.log("token verification done");
    }
}