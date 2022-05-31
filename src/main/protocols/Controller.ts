import { Request, Response } from "express";
import { CarroDTO } from "../../domain/Carro";

export interface IController {
  handler(req: Request): Response;
}
