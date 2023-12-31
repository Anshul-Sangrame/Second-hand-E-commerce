import pool from '../database/db.js'

async function Cartget(req,res){
    try{
        let Query2;
        Query2 = await pool.query("select id,title,cost,image_url,carts.qty from products,carts where carts.product_id=id and carts.user_id=$1 order by id",[req.user_id]);
        res.json(Query2.rows);
    }
    catch(err){
       
        console.log(err);
    }
}
async function Cartpost(req,res){
    let Query;
    if(req.body.select ==="qty")
    {   try{
           
            Query = await  pool.query("update carts set qty=$1 where user_id =$2 and product_id=$3 RETURNING *",[req.body.qty,req.user_id,req.body.product_id]);
            console.log(Query.rows[0]);
            res.send('ok');
        }
        catch(err)
        {
            console.log(err);
            res.status(500).send('server error');
        }
    }
    else if(req.body.select ==="cart"){
        try{
                Query = await pool.query("Insert into carts values($1, $2, $3)",[req.user_id,req.body.product_id,req.body.qty]);
                console.log(Query.rows[0]);
                res.send('ok');
        }
        catch(err){
            console.log(err);
        }
    }
    else{
        try{

            console.log(req.body.id+"id");
            Query = await pool.query("delete from carts where user_id=$1 and product_id =$2",[req.user_id,req.body.id]);
            console.log("DELETED");
            res.send('ok');
        }
        catch(err)
        {
            console.log(err);
            res.status(500).send('server error');
        }
    }
    
}
export {Cartpost,Cartget}
