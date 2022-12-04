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
  if (typeof body.text != "string") {
    res.status(400);
    res.json({ message: "Invalid data type" });
    return;
  }

  body.length = body.text.length;
  body.readingTimeM = Math.floor(body.length / 20);
  res.json(await prisma.blabbering.create({ data: body }));
});

app.put("/:id", async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  console.log(id);
  if (typeof body.text != "string") {
    res.status(400);
    res.json({ message: "Invalid data type" });
    return;
  }
  body.length = body.text.length;
  body.readingTimeM = Math.floor(body.length / 20);
  res.json(
    await prisma.blabbering.update({
      where: {
        id: Number(id),
      },
      data: body,
    })
  );
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
