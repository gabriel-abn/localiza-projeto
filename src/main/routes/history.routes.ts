import { Router } from "express";
import { HistoryController } from "../controller/HistoryController";

export const historyRoute = Router();

historyRoute.post("/history", new HistoryController().register);
historyRoute.post("/alugar", new HistoryController().alugar);


historyRoute.get("/history/user/:cnh", new HistoryController().getHistoryByCNH);
historyRoute.get("/history/car/:placa", new HistoryController().getHistoryByPlaca);
