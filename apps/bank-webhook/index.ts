import express from "express"; 

import db from "@repo/db/client"


const app = express();

app.use(express.json())

app.post("/hdfcwebhook", (req,res)=>{
    const paymentInformation = {
        token:req.body.token,
        userId:req.body.user_identifier,
        amount:req.body.amount
    }
    db.balance
})