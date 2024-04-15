const express = require("express");
const userRouter = express.Router();
const zod = require("zod");
const { User, Account } = require("../db/db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const authMiddleware = require("../middleware/middleware");

const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string().min(1),
	lastName: zod.string().min(1),
	password: zod.string().min(1)
})
const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

userRouter.post("/signup", async (req, res) => {
    const response = signupBody.safeParse(req.body);
    const success = response.success;
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    const account = await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token,
        id: userId,
        balance: account.balance,
        firstName: user.firstName
    })
})

userRouter.post('/signin', async (req, res) => {
    const response = signinBody.safeParse(req.body);
    const success = response.success;

    if(!success){
        res.status(411).json({
            message: 'Incorrect inputs'
        })
        return; //return will stop the code
    }
    const username = req.body.username;
    const password = req.body.password;

    const checkUsername = await User.findOne({username: username});

    if(checkUsername !== null) {
        const checkPassword = await User.findOne({password: password});
        const accountBalance = await Account.findOne({userId: checkUsername._id});

        if(checkPassword !== null) {
            var token = jwt.sign({ username: username }, JWT_SECRET);
            res.json({
                token: token,
                id: checkUsername._id,
                balance: accountBalance.balance,
                firstName: checkUsername.firstName
            });
        } else {
            res.json({message: "Username or password not valid"});
        }
    } else {
        res.json({message: "Username or password not valid"});
    }
})

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

//Working no error
userRouter.put('/', authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Invalid Input"
        });
    }

    try {
        // Assuming you have a valid authMiddleware that sets req.userId
        const userIdToUpdate = req.body.userId;

        // Use the userIdToUpdate in the update query
        const updateResult = await User.updateOne({ _id: userIdToUpdate }, { $set: req.body });

        if (updateResult.nModified === 1) {
            return res.json({
                message: "Updated successfully"
            });
        } else {
            return res.status(404).json({
                message: "User not found or not updated"
            });
        }
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

userRouter.get("/verify-token", [authMiddleware], (req, res) => {
    res.status(200).json({});
})

module.exports = userRouter;