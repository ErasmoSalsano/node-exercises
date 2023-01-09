import { Router } from "express";
import { passport } from "../lib/middleware/passport";

const router = Router();

router.get("/login", (request, response, next) => {
  // Controlla se c'è il valore della pagina alla quale si deve reindirizzare dopo il login
  if (
    typeof request.query.redirectTo !== "string" ||
    !request.query.redirectTo
  ) {
    response.status(400);
    return next("Missing redirectTo query string parameter");
  }

  // session si può usare grazie ad express-session
  request.session.redirectTo = request.query.redirectTo;

  response.redirect("/auth/github/login");
});

// Path per l'autenticazione con GitHub
router.get(
  "/auth/github/login",
  passport.authenticate("github", {
    scope: ["user:email"], // Lo scope indica a quali dati vogliamo accedere
  })
);

// Path alla quale si viene reindirizzati dopo aver fatto l'accesso su GitHub
// Se quello è fallito reindirizza di nuovo lì, altrimenti continua
router.get(
  "/github/callback",
  // Se typescript desse errore in questo punto si dovrebbe usare // @ts-ignore
  passport.authenticate("github", {
    failureRedirect: "/auth/github/login",
    keepSessionInfo: true, // Serve a mantenere i dati della sessione (es. redirectTo)
  }),
  (request, response) => {
    if (request.session.redirectTo !== "string") {
      return response.status(500).end();
    }

    response.redirect(request.session.redirectTo);
  }
);

router.get("/logout", (request, response, next) => {
  if (
    typeof request.query.redirectTo !== "string" ||
    !request.query.redirectTo
  ) {
    response.status(400);
    return next("Missing redirectTo query string parameter");
  }

  const redirectUrl = request.query.redirectTo;

  request.logout((error) => {
    if (error) {
      return next(error);
    }

    response.redirect(redirectUrl);
  });
});

export default router;
