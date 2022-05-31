import express from "express";
import { carroRoutes } from "./routes/carro.routes";
import { clienteRoutes } from "./routes/cliente.routes";

const app = express();
app.use(express.json());

app.use([carroRoutes, clienteRoutes]);

app.listen(3000, () => console.log("Server running in port 3000..."));
