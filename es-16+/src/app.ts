// import { PrismaClient } from "@prisma/client";
import express from "express";
import "express-async-errors";
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

app.use(validationErrorMiddleware);
