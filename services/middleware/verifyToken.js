const jwt = require('jsonwebtoken'); 

async function verifyToken(req, res, next) {
   const authHeader = req.headers['authorization']

   const authToken = authHeader && authHeader.split(' ')[1]

   if(authToken == null) {
    res.send("please provide a valid access token")
   }

   jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
        res.send(err)
    } else if (user){
        req.user = user; 
        next();
    }
   })
}

module.exports = verifyToken; 