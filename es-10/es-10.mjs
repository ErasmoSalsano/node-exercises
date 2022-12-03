import { writeFile } from "node:fs";

writeFile(
  "message.txt",
  "File created for node exercise number 10",
  "utf8",
  (e) => (e ? console.warn(e) : console.log("file written correctly"))
);
