const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const Author = require("../models/author.model.js");
const jwt = require("jsonwebtoken")

function createToken(author, id) {
    const authorPayload = {
      author: author,
    };
  
    const accessToken = jwt.sign(authorPayload, process.env.ACCESS_TOKEN_SECRET);
  
    return accessToken;
  }  

// Opzioni per configurare il servizio OAuth di Google
const options = {
  // Client ID perso dalla console di Google alla registrazione dell'applicazione
  clientID: process.env.CLIENT_ID,
  // Client Secret preso dalla console di Google alla registrazione dell'applicazione
  clientSecret: process.env.CLIENT_SECRET,
  // Callback da eseguire quando un'utente effettua l'autenticazione all'endpoint
  callbackURL: process.env.REACT_APP_BACKEND_URL + process.env.CB,
};
console.log(options)
// Crea un'istanza di Google Strategy
const googleStrategy = new GoogleStrategy(
  options,
  async (_accessToken, _refreshToken, profile, passportNext) => {
    try {
      // Destrutturiamo l'oggetto profile e prendiamo i dati che ci servono
      const { email, given_name, family_name, sub, picture } = profile._json;
        
      // Verifica se l'utente esiste già nelò database
      const author = await Author.findOne({ email });

      // L'utente esiste già nel DB?
      if (author) {
        // L'utente esiste già nel DB

        // Creiamo il token di accesso, utilizzando il servizio di GoogleStrategy
        const accToken = await createToken({
          _id: author._id,
        });

        // Chiamiamo la callback, passando null come errore e accToken come secondo parametro
        passportNext(null, { accToken });
      } else {
        // L'utente non esiste nel DB

        // Crea un nuovo utente
        const newAuthor = new Author({
          name: given_name,
          lastName: family_name,
          email: email, 
          googleId: sub,
        });

        // Salva l'utente nel database
        await newAuthor.save();

        // Genera token
        const accToken = await createToken({
          username: newAuthor.username,
        });

        // Chiamiamo la callback, passando null come errore e accToken come secondo parametro
        passportNext(null, { accToken });
      }
    } catch (error) {
      passportNext(error);
    }
  }
);

module.exports = googleStrategy; 