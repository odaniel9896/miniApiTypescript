import dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";
import express from "express";
import { useRoutes } from "./routes";

const PORT = process.env.PORT || 8091;

const app = express();
app.use(bodyParser.json());

useRoutes(app);

app.listen(PORT, () => {
  console.log("Servidor rodando na porta: " + PORT);
});
