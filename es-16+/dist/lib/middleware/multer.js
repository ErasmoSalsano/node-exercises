"use strict";
/*
Questo pacchetto permette la gestione di richieste di tipo multipart/form-data,
quindi ad esempio l'upload di file.
Qui lo si configura e si esportano i dati necessari al suo utilizzo
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMulterMiddleware = exports.multerOptions = void 0;
const multer_1 = __importDefault(require("multer"));
// Indica il percorso in cui salvare i file ricevuti
const storage = multer_1.default.diskStorage({
    destination: "uploads/",
});
exports.multerOptions = {};
const initMulterMiddleware = () => {
    return (0, multer_1.default)({ storage, ...exports.multerOptions });
};
exports.initMulterMiddleware = initMulterMiddleware;
//# sourceMappingURL=multer.js.map