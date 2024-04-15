const mongoose = require('mongoose');

// require('dotenv').config()
// Connect to MongoDB
mongoose.connect('mongodb+srv://khanlaraib13:qwerty1234@cluster0.8dgrbiv.mongodb.net/Payment')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, //Reference to User model
        ref: 'User',                          //Acts as foreign key
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
}