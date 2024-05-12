require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose');
const authorsRoute = require('./services/routes/authors.route')
const blogsRoute = require('./services/routes/blogs.route')
const data = require("./src/data/posts.json");
const cors = require("cors")
const sendEmail = require('./services/middleware/mailer')
const passport = require("passport")
const googleStrategy = require("./services/middleware/passport");
const app = express(); 
const port = 3000; 

app.use(cors())
app.use(express.json());

// Utilizziamo la google strategy
passport.use("google", googleStrategy);

app.get('/', (req, res) => {
    res.send(data)
})

app.use("/authors", authorsRoute )
app.use("/blogs", blogsRoute )

async function initServer() {
    try{
      await mongoose.connect(process.env.DB_URL)

      console.log("connection successful!")
      
      // sendEmail(); 

      app.listen(port, () => {
        console.log(`listening on port ${port}`)
      })

    } catch(err) {
        console.log("connection error!")
        console.log(err)
    }
}

initServer();
