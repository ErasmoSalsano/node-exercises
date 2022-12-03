import "dotenv/config";
import { app } from "./app";

const port = process.env.BasePORT;
console.log(process.env.BasePORT ? "yes" : "no");

app.listen(port, () => console.log(`running at localhost: ${port}`));
