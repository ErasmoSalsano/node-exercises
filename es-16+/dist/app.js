"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// import { PrismaClient } from "@prisma/client";
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const validation_1 = require("./lib/middleware/validation");
const cors_1 = require("./lib/middleware/cors");
const planets_1 = __importDefault(require("./routes/planets")); // Qui si importano tutte le routes create in planets.ts sotto router
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
// Per prevenire errori di di richieste cors (cross origin resource sharing), da inserire dopo app.use(express.json()); e prima di ogni path (es. app.get() ecc)
exports.app.use((0, cors_1.initCorsMiddleware)());
// Dopo il cors middleware, altrimenti falliranno tutti i test che richiedono il cors
// In questo modo si collegano ad app tutte le routes create in planets.ts sotto router e viene indicato che partono tutte con /planets
exports.app.use("/planets", planets_1.default);
exports.app.use(validation_1.validationErrorMiddleware);
//# sourceMappingURL=app.js.map