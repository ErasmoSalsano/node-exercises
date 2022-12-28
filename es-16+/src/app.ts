// import { PrismaClient } from "@prisma/client";
import express from "express";
import "express-async-errors";

import { validationErrorMiddleware } from "./lib/middleware/validation";
import { initCorsMiddleware } from "./lib/middleware/cors";

import planetsRoutes from "./routes/planets"; // Qui si importano tutte le routes create in planets.ts sotto router

export const app = express();

app.use(express.json());

// Per prevenire errori di di richieste cors (cross origin resource sharing), da inserire dopo app.use(express.json()); e prima di ogni path (es. app.get() ecc)
app.use(initCorsMiddleware());

// Dopo il cors middleware, altrimenti falliranno tutti i test che richiedono il cors
// In questo modo si collegano ad app tutte le routes create in planets.ts sotto router e viene indicato che partono tutte con /planets
app.use("/planets", planetsRoutes);

app.use(validationErrorMiddleware);
