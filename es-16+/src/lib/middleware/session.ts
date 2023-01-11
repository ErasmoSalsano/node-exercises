import session from "express-session";
import config from "../../config";

// Quando creiamo una nuova sessione inviamo un cookie dalla nostra API al browser
// secret serve a criptare il cookie della sessione, che contiene il sesison id
// È un dato sensibile e si inserisce in .env (devo ancora capire in produzione come si gestiscono questi dati)
// Se l'ambiente è produzione, il session cookie viene mandato solo nel caso in cui ci si trovi in https
// (cookie:{secure} è impostato a true se ci si trova in production)
// Per il suo funzionamento si deve impostare anche proxy a true nel caso ci si trovi in produzione
export function initSessionMiddleware(appEnvironment: string) {
  const isProduction = appEnvironment === "production";

  return session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProduction,
    },
    proxy: isProduction,
  });
}
