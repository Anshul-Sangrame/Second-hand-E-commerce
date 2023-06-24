import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export default function VerifyToken(req,res,next)
{
    try {
        const token = req.header("token");

        const payload = jwt.verify(token,process.env.SECRET);

        req.user_id = payload.user;
    } catch (err) {
        console.error(err.message);
    }
    finally {
        console.log("token verification done");
        next();
    }
}