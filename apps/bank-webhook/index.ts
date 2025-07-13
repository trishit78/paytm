import express from "express"; 

import db from "@repo/db/client"


const app = express();

app.use(express.json())

app.post("/hdfcwebhook",async  (req,res)=>{
    try {
    const paymentInformation = {
        token:req.body.token,
        userId:req.body.user_identifier,
        amount:req.body.amount
    }
    await db.balance.update({
        where:{
            userId:paymentInformation.userId
        },
        data:{
            amount:{
                increment:paymentInformation.amount
            }
        }
    })

    await db.onRampTransaction.update({
        where:{
            token:paymentInformation.token,
        },
        data:{
            status:"Success"
        }
    })
    res.status(200).json({
        message:"captured"
    })

    } catch (e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})