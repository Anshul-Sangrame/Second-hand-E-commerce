import pool from '../database/db.js'
import bcrypt from "bcrypt";

 async function EditProfileGet(req,res) {
        
        const CustomerEditDetails  = req.body;  
        let  Query;
        try{
            Query = await pool.query("select first_name, last_name, email,phone, city,state, address from users where id=$1 ",[req.user_id]);
          //   console.log(Query.rows[0]);
            return res.json(Query.rows[0]);
       }
       catch(err){

        console.log(err)
       }}

   async function EditProfilePost(req,res) {
        
     const CustomerEditDetails  = req.body;  
     let  Query;
     try{
         Query = await pool.query("update users set first_name=$1,last_name=$2,email=$3,phone=$4,address=$5,city=$6,state=$7 where id=$8 RETURNING *" ,[CustomerEditDetails.first_name,CustomerEditDetails.last_name, CustomerEditDetails.email,CustomerEditDetails.phone,CustomerEditDetails.address,CustomerEditDetails.city,CustomerEditDetails.state,req.user_id]);
         console.log(Query.rows);
    }
    catch(err){
          console.log(err)
    }
 
}
export {EditProfilePost,EditProfileGet}