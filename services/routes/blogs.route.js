const express = require("express");
const Blog = require("../models/blog.model.js");

const { reset } = require("nodemon");
const { trusted } = require("mongoose");
const { uploadCover } = require("../middleware/uploadFile.js");
const mailer = require("../middleware/mailer.js");
const verifyToken = require("../middleware/verifyToken.js");

const blogsRoute = express.Router();

blogsRoute.get("/", verifyToken, async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author");
    res.send(blogs);
  } catch (err) {
    res.send(err);
  }
});

blogsRoute.post("/", verifyToken, mailer, async (req, res) => {
  try {
    req.body.author = req.user.author._id;

    const result = await Blog.create(req.body);

    res.status(201).send(result);
  } catch (err) {
    res.send(err);
  }
});

blogsRoute.get("/:id", verifyToken, async (req, res) => {
  try {
    const result = await Blog.findById(req.params.id)
      .populate("author")
      .populate("comments.author");
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

blogsRoute.patch("/:id/cover", uploadCover, async (req, res, next) => {
  try {
    let updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { cover: req.file.path },
      { new: true }
    );

    res.send(updatedBlog);
  } catch (err) {
    res.send(err);
  }
});

blogsRoute.patch("/:id/author", async (req, res, next) => {
  try {
    let updatedAuthor = await Blog.findByIdAndUpdate(
      req.params.id,
      { author: req.body.author },
      { new: true }
    );

    res.send(updatedAuthor);
  } catch (err) {
    res.send(err);
  }
});

blogsRoute.get("/:id/comments", async (req, res, next) => {
  try {
    let post = await Blog.findById(req.params.id);

    res.send(post.comments);
  } catch (err) {
    res.send(err);
  }
});

blogsRoute.post("/:id/comments", verifyToken, async (req, res, next) => {
  try {
    //viene creato req.user.author tramite il middleware
    // va messo nel commento come autore.

    let blog = await Blog.findById(req.params.id);

    req.body.comment.author = req.user.author._id;
    blog.comments = [...blog.comments, req.body.comment];

    let updatedComments = await Blog.findByIdAndUpdate(
      req.params.id,
      { comments: blog.comments },
      { new: true }
    );

    res.send(updatedComments);
  } catch (err) {
    res.send(err);
  }
});

blogsRoute.get("/:id/comments/:index", async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id);
    let comment = blog.comments[req.params.index];

    console.log(req.params.id);
    res.send(comment);
  } catch (err) {
    res.send(err);
  }
});

blogsRoute.put("/:id/comments/:index", async (req, res, next) => {
  try {
    let index = req.params.index;
    let blog = await Blog.findById(req.params.id);
    blog.comments[index] = req.body.comment;

    let updatedComment = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        comments: blog.comments,
      },
      {
        new: true,
      }
    );

    res.send(updatedComment);
  } catch (err) {
    res.send(err);
  }
});

blogsRoute.delete("/:id/comments/:index", verifyToken , async (req, res, next) => {
  try {
    let index = req.params.index;
    let blog = await Blog.findById(req.params.id);
    let newComments = blog.comments.filter((el, el_index) => el_index != index);

    let updatedComment = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        comments: newComments,
      },
      {
        new: true,
      }
    );

    res.send(updatedComment);
  } catch (err) {
    res.send(err);
  }
});

module.exports = blogsRoute;
