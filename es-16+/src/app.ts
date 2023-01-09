// import { PrismaClient } from "@prisma/client";
import express from "express";
import "express-async-errors";

import { validationErrorMiddleware } from "./lib/middleware/validation";
import { initCorsMiddleware } from "./lib/middleware/cors";
import { initSessionMiddleware } from "./lib/middleware/session";
import { passport } from "./lib/middleware/passport";

import planetsRoutes from "./routes/planets"; // Qui si importano tutte le routes create in planets.ts sotto router
import authRoutes from "./routes/auth";

export const app = express();

// Questi tre gestiscono l'autenticazione
app.use(initSessionMiddleware()); // Crea il session middleware
app.use(passport.initialize()); // Inizializza passport middleware, configurato per l'autenticazione con GitHub
app.use(passport.session()); // Inizializza session middleware, serializza e deserializza i dati utente dopo l'accesso

app.use(express.json());

// Per prevenire errori di di richieste cors (cross origin resource sharing), da inserire dopo app.use(express.json()); e prima di ogni path (es. app.get() ecc)
app.use(initCorsMiddleware());

// Dopo il cors middleware, altrimenti falliranno tutti i test che richiedono il cors
// In questo modo si collegano ad app tutte le routes create in planets.ts sotto router e viene indicato che partono tutte con /planets
app.use("/planets", planetsRoutes);
// In questo modo si collegano ad app tutte le routes create in auth.ts sotto router e viene indicato che partono tutte con /auth
app.use("/auth", authRoutes);

app.use(validationErrorMiddleware);
