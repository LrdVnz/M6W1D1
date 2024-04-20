const express = require("express");
const Author = require("../models/author.model.js");

const data = require("../../src/data/posts.json");
const { reset } = require("nodemon");

const authorsRoute = express.Router();

authorsRoute.get("/", async (req, res) => {
  res.send(showAuthors(data));
});

/* authorsRoute.get("/seeReq", async (req, res) =>  {
  res.send(req.body.name)
})
 */

authorsRoute.get("/authors", async (req, res) => {
  try {
    const data = await Author.find();
    res.json(data);
  } catch (err) {
    res.send(err);
  }
});

authorsRoute.get("/:id", async (req, res) => {
  try {
    const result = await Author.findById(req.params.id);

    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

authorsRoute.post("/", async (req, res) => {
  try {
    let author = await Author.create(req.body);

    res.send(author).status(400);
  } catch (err) {
    res.send(err);
  }
});

// example id for modify 661bd43fc1e727255a0f6a68

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

function showAuthors(data) {
  let authors = data.map((article) => {
    return article.author.name;
  });

  return authors;
}

module.exports = authorsRoute;
