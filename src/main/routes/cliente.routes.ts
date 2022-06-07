import { Router } from "express";
import { GetAllClientes } from "../controller/GetAllClientes";
import { GetClienteController } from "../controller/GetCliente";
import { RegistrarClienteController } from "../controller/RegistrarClienteController";

export const clienteRoutes = Router();

clienteRoutes.post("/cliente", new RegistrarClienteController().handler);
clienteRoutes.post("/login", new RegistrarClienteController().login);

clienteRoutes.get("/cliente/all", new GetAllClientes().handler);
clienteRoutes.get("/cliente/:cnh", new GetClienteController().handler);
