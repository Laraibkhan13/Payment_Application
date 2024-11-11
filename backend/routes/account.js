const express = require("express");
const { Account } = require("../db/db");
const authMiddleware = require("../middleware/middleware");
const { default: mongoose } = require("mongoose");
const zod = require("zod");

const accountRouter = express.Router();

accountRouter.get('/balance', authMiddleware ,async (req, res)=>{
    try{
        const account = await Account.findOne({
            userId: req.query.userId
            
        })
        res.status(200).json({balance: account.balance});
    } catch(e){
        res.status(404).json({message: "Wrong id."});
    }
})

const moneyBody = zod.object({
    amount: zod.string().min(1)
})

accountRouter.post("/transfer", authMiddleware, async (req, res) => {

    const response = moneyBody.safeParse({ amount: req.body.amount });

    const success = response.success;
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.body.userId }).session(session);
    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.body.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});

module.exports = accountRouter;