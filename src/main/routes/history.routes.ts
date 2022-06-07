import { Router } from "express";
import { GetAllCarros } from "../controller/GetAllCarros";
import { GetCarroController } from "../controller/GetCarro";
import { HistoryController } from "../controller/HistoryController";

export const historyRoute = Router();

historyRoute.post("/history", new HistoryController().register);

historyRoute.get("/history/user/:cnh", new GetAllCarros().handler);
historyRoute.get("/history/car/:placa", new GetCarroController().handler);
