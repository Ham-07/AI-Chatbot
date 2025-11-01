import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(urlencoded());
app.use("/api",router);


// app.listen(port, () => {
//   console.log(`app is listening to http://localhost:${port}`);
// });
export default app;