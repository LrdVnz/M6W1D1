const jwt = require('jsonwebtoken'); 

async function verifyToken(req, res, next) {
   const authHeader = req.headers['authorization']

   const authToken = authHeader && authHeader.split(' ')[1]

   if(authToken == null) {
    res.send("please provide a valid access token")
   }

   jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
        res.sendStatus(401)
    } else if (user){
        console.log(user)
        req.user = user; 
        next();
    }
   })
}

module.exports = verifyToken; 