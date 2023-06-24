import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export default function VerifyToken(req,res,next)
{
    try {

        // // skip verification of public routes
        // const publicRoutes = ['/login','/signup','/test'];
        // if (publicRoutes.includes(req.path)) {
        //     next();
        //     return;
        // }

        const token = req.header("token");
        if (!token)
        {
            // next();
            return;
        }

        const payload = jwt.verify(token,process.env.SECRET);

        req.user_id = payload.user;

        // next();
    } catch (err) {
        console.error(err.message);
    }
    finally {
        console.log("token verification done");
        next();
    }
}