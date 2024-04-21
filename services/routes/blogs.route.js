const express = require("express");
const Blog = require("../models/blog.model.js");

const { reset } = require("nodemon");
const { trusted } = require("mongoose");
const { uploadCover } = require("../middleware/uploadFile.js");

const blogsRoute = express.Router();

blogsRoute.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.send(blogs);
  } catch (err) {
    res.send(err);
  }
});

blogsRoute.post("/", async (req, res) => {
  try {
    const result = await Blog.create(req.body);

    res.send(result).status(400);
  } catch (err) {
    res.send(err);
  }
});

blogsRoute.get("/:id", async (req, res) => {
  try {
    const result = await Blog.findById(req.params.id);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

blogsRoute.put("/:id", async (req, res) => {
  try {
    const updatedBody = req.body;
    const result = await Blog.updateOne({ _id: req.params.id }, updatedBody);

    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

blogsRoute.delete("/:id", async (req, res) => {
  try {
    const result = await Blog.deleteOne({ _id: req.params.id });

    res.send(result);
  } catch (err) {
    res.send(err);
  }
});


blogsRoute.patch("/:id/cover", uploadCover, async (req, res, next ) => {

   try {

    let updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id, 
      { cover: req.file.path }, 
      { new: true }
    ); 

    res.send(updatedBlog)
   } catch(err) {
    res.send(err)
   }
   
})

blogsRoute.patch("/:id/author", async (req, res, next) => {

  try {

    let updatedAuthor = await Blog.findByIdAndUpdate(
      req.params.id, 
      { author: req.body.author }, 
      { new: true }
    )

    res.send(updatedAuthor)
  } catch(err) {
    res.send(err)
  }
})

module.exports = blogsRoute;
