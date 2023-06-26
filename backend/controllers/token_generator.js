import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export default function jwtGenerator(userid)
{
    const payload = {
        user: userid
    }
    return jwt.sign(payload,process.env.SECRET,{ expiresIn: '1hr'})
}