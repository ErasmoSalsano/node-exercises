import { PrismaClient } from "@prisma/client";
import express from "express";
import "express-async-error";

const prisma = new PrismaClient();
export const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.json(await prisma.blabbering.findMany());
  console.log("All good here");
});

app.post("/", async (req, res) => {
  const body = req.body;
  res.json(await prisma.blabbering.create(body));
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(
    await prisma.blabbering.findUnique({
      where: {
        id: Number(id),
      },
    })
  );
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(
    await prisma.blabbering.delete({
      where: {
        id: Number(id),
      },
    })
  );
});
