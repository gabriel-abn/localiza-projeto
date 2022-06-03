import { Router } from "express";
import { GetAllCarros } from "../controller/GetAllCarros";
import { GetCarroController } from "../controller/GetCarro";
import { RegistrarCarroController } from "../controller/RegistrarCarroController";

export const carroRoutes = Router();

carroRoutes.post("/carro", new RegistrarCarroController().handler);

carroRoutes.get("/carro/all", new GetAllCarros().handler);
carroRoutes.get("/carro/:id", new GetCarroController().handler);
