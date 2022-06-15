import { Router } from "express";
import { HistoryController } from "../controller/HistoryController";

export const historyRoute = Router();

historyRoute.post("/history", new HistoryController().register);
historyRoute.post("/alugar", new HistoryController().alugar);
historyRoute.post("/devolver", new HistoryController().devolver);
historyRoute.post("/renovate", new HistoryController().renovate);


historyRoute.get("/history/user/:cnh", new HistoryController().getHistoryByCNH);
historyRoute.get("/history/car/:placa", new HistoryController().getHistoryByPlaca);
