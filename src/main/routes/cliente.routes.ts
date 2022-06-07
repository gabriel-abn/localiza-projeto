import { Router } from "express";
import { GetAllClientes } from "../controller/GetAllClientes";
import { GetClienteController } from "../controller/GetCliente";
import { GetClienteHistoricoController } from "../controller/GetClienteHistorico";
import { RegistrarClienteController } from "../controller/RegistrarClienteController";

export const clienteRoutes = Router();

clienteRoutes.post("/cliente", new RegistrarClienteController().handler);

clienteRoutes.get("/cliente/all", new GetAllClientes().handler);
clienteRoutes.get("/cliente/:cnh", new GetClienteController().handler);
