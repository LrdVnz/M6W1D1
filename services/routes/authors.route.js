const express = require("express");
const Author = require("../models/author.model.js");
const Post = require("../models/blog.model.js");
const { uploadAvatar } = require("../middleware/uploadFile.js");
const data = require("../../src/data/posts.json");
const { reset } = require("nodemon");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken.js");

require("dotenv").config();

const authorsRoute = express.Router();

authorsRoute.get("/", async (req, res) => {
  res.send(showAuthors(data));
});

/*
Dobbiamo fare in modo che l'utente possa loggare al suo account. 
Dovrà passare come body : 
nome utente 
password. 
La password verrà decriptata e gestita da bcrypt. 
*/
authorsRoute.post("/login", async (req, res) => {
  const author = await Author.findOne({ name: req.body.name });
  if (author == null) {
    res.send("author not found");
  }
  if (bcrypt.compare(req.body.password, author.password)) {
   
    const accessToken = createToken(author);
    res.json({ accessToken: accessToken });
  } else {
    res.send("you typed the wrong password");
  }
});

authorsRoute.get("/", async (req, res) => {
  try {
    const data = await Author.find();
    res.json(data);
  } catch (err) {
    res.send(err);
  }
});

authorsRoute.get("/posts", verifyToken, async (req, res, next) => {
  console.log(req.user)
  let posts = await Post.find(
    {
      author : req.user
    });

  console.log("yeyeyeyeey")
  res.send(posts)
});

authorsRoute.get("/:id", async (req, res) => {
  try {
    const result = await Author.findById(req.params.id);

    res.send(result);
  } catch (err) {
    res.send(err);
  }
});


/* Da inserire la crittazione della password tramite bcrypt. 
   - Prendi password 
   - Genera salt 
   - Genera hash 
   - salva la password con hash
*/

authorsRoute.post("/", async (req, res) => {
  try {
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);

    /* 
    cambiamo la password passata dall'utente con quella generata da bcrypt
    in questo modo possiamo copiare direttamente il body per creare l'utente senza scrivere ogni parametro a mano!  
    */
    req.body.password = hashedPassword;

    let author = await Author.create(req.body);

    res.send(author).status(400);
  } catch (err) {
    res.send(err);
  }
});

authorsRoute.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const update = req.body;

    const result = await Author.updateOne({ _id: id }, update);

    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

authorsRoute.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Author.deleteOne({ _id: id });

    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

authorsRoute.patch("/:id/avatar", uploadAvatar, async (req, res, next) => {
  try {
    let updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      { avatar: req.file.path },
      { new: true }
    );

    res.send(updatedAuthor);
  } catch (err) {
    res.send(err);
  }
});

function showAuthors(data) {
  let authors = data.map((article) => {
    return article.author.name;
  });

  return authors;
}

function createToken(author, id) {
  console.log("yeyeeyeyey")
  const authorPayload = {
    author: author,
  };

  const accessToken = jwt.sign(authorPayload, process.env.ACCESS_TOKEN_SECRET);

  return accessToken;
}

module.exports = authorsRoute;
