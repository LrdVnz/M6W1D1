const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const Author = require("../models/author.model.js");
const jwt = require("jsonwebtoken")

function createToken(author, id) {
    const authorPayload = {
      author: author,
    };

    console.log("il payload passato nel jwt sign : ")
    console.log(authorPayload)
    const accessToken = jwt.sign(authorPayload, process.env.ACCESS_TOKEN_SECRET);
    console.log("-------------------------------------")

    return accessToken;
  }  

const options = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.REACT_APP_BACKEND_URL + process.env.CB,
};

const googleStrategy = new GoogleStrategy(
  options,
  async (_accessToken, _refreshToken, profile, passportNext) => {
    try {
      const { email, given_name, family_name, sub, picture } = profile._json;
      
      console.log("picture è ????")
      console.log(picture)
      console.log("-------------------")
      const author = await Author.findOne({ email });

      if (author) {
        const accToken = createToken({
          _id: author._id,
        });

       passportNext(null, { accToken });
      } else {
       const newAuthor = new Author({
          name: given_name,
          lastName: family_name,
          email: email, 
          googleId: sub,
          avatar: picture
        });

        console.log("il nuovo autore che viene creato : ")
        console.log(newAuthor)
        console.log("--------------------------------- ")

        await newAuthor.save();

         const accToken = createToken({
          name: newAuthor.name,
          _id: newAuthor._id 
        });

        passportNext(null, { accToken });
      }
    } catch (error) {
      passportNext(error);
    }
  }
);

module.exports = googleStrategy; 