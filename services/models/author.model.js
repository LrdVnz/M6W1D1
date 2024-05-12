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

    password: {
      type: String, 
      required: false, 
    },

    googleId: {
      type: String, 
      required: false,   
    },

    email: {
      type: String,
      required: true,
    },

    birthDate: {
      type: String,
      required: false,
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
