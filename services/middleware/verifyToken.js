const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  let authToken = authHeader && authHeader.split(" ")[1];

  if (authToken == null) {
    const accessToken = req.query.accessToken;
    req.user = { accToken: accessToken };
     
    if (accessToken == null) {
        res.send("please provide a valid access token");
    } else {
        authToken = accessToken
    }
  }

  jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(401);
    } else if (user) {
      console.log(user);
      req.user = user;
      next();
    }
  });
}

module.exports = verifyToken;
