import { Router } from "express";
import { GetAllClientes } from "../controller/GetAllClientes";
import { RegistrarClienteController } from "../controller/RegistrarClienteController";

export const clienteRoutes = Router();

clienteRoutes.post("/cliente", new RegistrarClienteController().handler);

clienteRoutes.get("/cliente/all", new GetAllClientes().handler);
