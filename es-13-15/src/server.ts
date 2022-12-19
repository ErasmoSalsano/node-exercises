import "dotenv/config";
import { app } from "./app";

const port = process.env.BasePORT;

app.listen(port, () => console.log(`running at localhost: ${port}`));
