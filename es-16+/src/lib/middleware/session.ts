import session from "express-session";
import config from "../../config";

// Quando creiamo una nuova sessione inviamo un cookie dalla nostra API al browser
// secret serve a criptare il cookie della sessione, che contiene il sesison id
// È un dato sensibile e si inserisce in .env (devo ancora capire in produzione come si gestiscono questi dati)
export function initSessionMiddleware() {
  return session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  });
}
