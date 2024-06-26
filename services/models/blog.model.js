const { Schema, model, default: mongoose } = require("mongoose");

const readTime = new Schema({
  value: {
    type: Number,
    required: true,
  },

  unit: {
    type: String,
    required: true,
  },
});

const author = new Schema({
  name: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: false,
  },
});

const blogSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    cover: {
      type: String,
      required: true,
    },

    readTime: {
      type: readTime,
      required: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },

    content: {
      type: String,
      required: true,
    },

    comments: [
      {
        author: {
          type: Schema.Types.ObjectId,
          ref: "Author",
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
  },

  {
    collection: "blogs",
  }
);

module.exports = model("Blog", blogSchema);
