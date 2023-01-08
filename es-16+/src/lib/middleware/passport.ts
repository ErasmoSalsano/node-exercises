// Questo file serve alla gestione dell'autenticazione
// Sono stati installati i pacchetti:
// passport, @types/passport
// passport-github2 (login con GitHub), @types/passport-github2
// express-session (utente loggato), @types/express-session

import passport from "passport";
import passportGitHub2 from "passport-github2";

// Strategy è il verbo che serve per le diverse forme di autenticazione, in questo caso con GitHub
const githubStrategy = new passportGitHub2.Strategy(
  {
    clientID: "",
    clientSecret: "",
    callbackURL: "",
  },
  // In questa funzione si specificano i tipi perchè alcuni di quelli preimpostati nella libreria sono sbagliati
  function (
    accessToken: string,
    refreshToken: string,
    profile: { [key: string]: string },
    done: (error: null, user: Express.User) => void
  ) {
    // Il tipo Express.User è stato creato da noi in index.d.ts
    const user: Express.User = {
      username: profile.username,
    };

    done(null, user);
  }
);

passport.use(githubStrategy);

// Passando a passport.serializeUser il dato di tipo Express.User (creato da noi in index.d.ts)
// Si salva nella sessione (vedere  session.ts) l'utente attivo
passport.serializeUser<Express.User>((user, done) => done(null, user));

// Con questa invece si recupera l'utente salvato per poterlo usare quando serve
passport.deserializeUser<Express.User>((user, done) => done(null, user));

export { passport };
