"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// import { PrismaClient } from "@prisma/client";
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors")); // Per prevenire errori di di richieste cors (cross origin resource sharing)
const multer_1 = require("./lib/middleware/multer"); // Per permettere la gestione di richieste multipart/form-data (es upload di file)
const validation_1 = require("./lib/validation");
const client_1 = __importDefault(require("./lib/prisma/client"));
// const prisma = new PrismaClient();
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const upload = (0, multer_1.initMulterMiddleware)(); // Si inizializza la variabile necessaria alla gestione delle richieste di upload di file (multipart/form-data)
// Per configurare cors
const corsOption = {
    origin: "http://localhost:8080",
};
// Per prevenire errori di di richieste cors (cross origin resource sharing), da inserire dopo app.use(express.json()); e prima di ogni path (es. app.get() ecc)
exports.app.use((0, cors_1.default)(corsOption));
exports.app.get("/planets", async (req, res) => {
    const planets = await client_1.default.planet.findMany();
    res.json(planets);
});
exports.app.post("/planets", (0, validation_1.validate)({ body: validation_1.planetSchema }), async (request, response) => {
    const planetData = request.body;
    const planet = await client_1.default.planet.create({ data: planetData });
    response.status(201).json(planet);
});
// qui si inserisce una regular expression che indica uno o più caratteri numerici (\\d+)
// quindi se i caratteri non sono validi verrà restituito un errore di default per route invalida
exports.app.get("/planets/:id(\\d+)", async (request, response, next) => {
    const planetId = Number(request.params.id);
    const planet = await client_1.default.planet.findUnique({
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
exports.app.put("/planets/:id(\\d+)", (0, validation_1.validate)({ body: validation_1.planetSchema }), async (request, response, next) => {
    const planetId = Number(request.params.id);
    const planetData = request.body;
    try {
        const planet = await client_1.default.planet.update({
            where: { id: planetId },
            data: planetData,
        });
        response.status(200).json(planet);
    }
    catch (error) {
        response.status(404);
        next(`Cannot PUT /planets/${planetId}`);
    }
});
exports.app.delete("/planets/:id(\\d+)", async (request, response, next) => {
    const planetId = Number(request.params.id);
    try {
        await client_1.default.planet.delete({
            where: { id: planetId },
        });
        response.status(204).end();
    }
    catch (error) {
        response.status(404);
        next(`Cannot DELETE /planets/${planetId}`);
    }
});
// In questa path si gestisce l'upload di file, in questo caso di foto del pianeta.
// Per renderlo possibile si utilizza il pacchetto multer (che gestisce multipart/form-data)
exports.app.post("/planets/:id(\\d+)/photo", upload.single("photo"), // "photo" nelle parentesi deve coincidere col name dell'input nel form in html
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
        await client_1.default.planet.update({
            where: { id: planetId },
            data: { photoFilename },
        });
        response.status(201).json({ photoFilename });
    }
    catch (error) {
        response.status(404);
        next(`Cannot POST /planets/${planetId}/photo`);
    }
});
// Quando è in questo percorso prende i dati dalla cartella uploads
// Quindi /planets/photos/file.png fa vedere il file file.png se c'è in uploads
exports.app.use("/planets/photos", express_1.default.static("uploads"));
exports.app.use(validation_1.validationErrorMiddleware);
//# sourceMappingURL=app.js.map