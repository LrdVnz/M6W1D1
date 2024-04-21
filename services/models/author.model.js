const { Schema, model } = require("mongoose");

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    birthDate: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      required: false,
    },
  },

  {
    collection: "authors",
  }
);

module.exports = model("Author", authorSchema);
