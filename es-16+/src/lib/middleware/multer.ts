/*
Questo pacchetto permette la gestione di richieste di tipo multipart/form-data,
quindi ad esempio l'upload di file.
Qui lo si configura e si esportano i dati necessari al suo utilizzo
*/
import multer from "multer";

// Questo pacchetto serve ad identificare l'estensione dei file uploadati
import mime from "mime";

import { randomUUID } from "node:crypto";

// Questa funzione genera randomicamente il nome del file ed aggiunge l'estensione in base al tipo di file, grazie a mime.
// Viene testata con uno unit test perchè è più facile rispetto ad inserire il test nell'integration test.
export const generatePhotoFilename = (mimeType: string) => {
  const randomFilename = `${randomUUID()}-${Date.now()}`;
  const fileExtension = mime.getExtension(mimeType);
  const filename = `${randomFilename}.${fileExtension}`;

  return filename;
};

// Indica il percorso in cui salvare i file ricevuti
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (request, file, callback) => {
    return callback(null, generatePhotoFilename(file.mimetype));
  },
});

export const initMulterMiddleware = () => {
  return multer({ storage, ...multerOptions });
};

export const multerOptions = {};
