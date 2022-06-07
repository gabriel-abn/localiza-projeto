import express from "express";
import cors from "cors";
import { carroRoutes } from "./routes/carro.routes";
import { clienteRoutes } from "./routes/cliente.routes";
import { historyRoute } from "./routes/history.routes";

const app = express();
app.use(cors())
app.use(express.json());

app.use([carroRoutes, clienteRoutes, historyRoute]);

app.listen(5000, () => console.log("Server running in port 5000..."));
