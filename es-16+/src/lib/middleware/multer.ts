/*
Questo pacchetto permette la gestione di richieste di tipo multipart/form-data,
quindi ad esempio l'upload di file.
Qui lo si configura e si esportano i dati necessari al suo utilizzo
*/

import multer from "multer";

export const multerOptions = {};

export const initMulterMiddleware = () => {
  return multer(multerOptions);
};
