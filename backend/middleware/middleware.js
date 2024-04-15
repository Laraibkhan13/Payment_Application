const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config");

function authMiddleware(req, res, next) {
  
    let token = req.headers.authorization;
    try{
        jwt.verify(token, JWT_SECRET);
        next();
      } catch (err){
        res.status(404).json({
            message: "Invalid token"
        })
      }
}

module.exports = authMiddleware;