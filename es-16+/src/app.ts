// import { PrismaClient } from "@prisma/client";
import express from "express";
import "express-async-errors";

import cors from "cors"; // Per prevenire errori di di richieste cors (cross origin resource sharing)

import { initMulterMiddleware } from "./lib/middleware/multer"; // Per permettere la gestione di richieste multipart/form-data (es upload di file)

import {
  validate,
  planetSchema,
  validationErrorMiddleware,
  PlanetData,
} from "./lib/validation";

import prisma from "./lib/prisma/client";
// const prisma = new PrismaClient();
export const app = express();

app.use(express.json());

const upload = initMulterMiddleware(); // Si inizializza la variabile necessaria alla gestione delle richieste di upload di file (multipart/form-data)

// Per configurare cors
const corsOption = {
  origin: "http://localhost:8080",
};

// Per prevenire errori di di richieste cors (cross origin resource sharing), da inserire dopo app.use(express.json()); e prima di ogni path (es. app.get() ecc)
app.use(cors(corsOption));

app.get("/planets", async (req, res) => {
  const planets = await prisma.planet.findMany();

  res.json(planets);
});

app.post(
  "/planets",
  validate({ body: planetSchema }),
  async (request, response) => {
    const planetData: PlanetData = request.body;
    const planet = await prisma.planet.create({ data: planetData });

    response.status(201).json(planet);
  }
);

// qui si inserisce una regular expression che indica uno o più caratteri numerici (\\d+)
// quindi se i caratteri non sono validi verrà restituito un errore di default per route invalida
app.get("/planets/:id(\\d+)", async (request, response, next) => {
  const planetId = Number(request.params.id);

  const planet = await prisma.planet.findUnique({
    where: {
      id: planetId,
    },
  });

  if (!planet) {
    response.status(404);
    return next(`Cannot GET /planets/${planetId}`);
  }

  response.json(planet);
});

app.put(
  "/planets/:id(\\d+)",
  validate({ body: planetSchema }),
  async (request, response, next) => {
    const planetId = Number(request.params.id);
    const planetData: PlanetData = request.body;

    try {
      const planet = await prisma.planet.update({
        where: { id: planetId },
        data: planetData,
      });

      response.status(200).json(planet);
    } catch (error) {
      response.status(404);
      next(`Cannot PUT /planets/${planetId}`);
    }
  }
);

app.delete("/planets/:id(\\d+)", async (request, response, next) => {
  const planetId = Number(request.params.id);
  try {
    await prisma.planet.delete({
      where: { id: planetId },
    });

    response.status(204).end();
  } catch (error) {
    response.status(404);
    next(`Cannot DELETE /planets/${planetId}`);
  }
});

// In questa path si gestisce l'upload di file, in questo caso di foto del pianeta.
// Per renderlo possibile si utilizza il pacchetto multer (che gestisce multipart/form-data)
app.post(
  "/planets/:id(\\d+)/photo",
  upload.single("photo"), // "photo" nelle parentesi deve coincidere col name dell'input nel form in html
  async (request, response, next) => {
    console.log("request.file", request.file);

    if (!request.file) {
      //Se il file upload non esiste
      response.status(400);
      return next("No photo file uploaded.");
    }

    // Altrimenti continua
    const planetId = Number(request.params.id);
    const photoFilename = request.file.filename; // Possibile grazie a multer

    try {
      await prisma.planet.update({
        where: { id: planetId },
        data: { photoFilename },
      });
      response.status(201).json({ photoFilename });
    } catch (error) {
      response.status(404);
      next(`Cannot POST /planets/${planetId}/photo`);
    }
  }
);

// Quando è in questo percorso prende i dati dalla cartella uploads
// Quindi /planets/photos/file.png fa vedere il file file.png se c'è in uploads
app.use("/planets/photos", express.static("uploads"));

app.use(validationErrorMiddleware);
