import { Request, Response } from "express";
import { RegisterCarUseCase } from "../../application/use-cases/registrar-carro";
import { CarroDTO } from "../../domain/Carro";
import { CarRepository } from "../../infra/repositories/prisma/CarroRepository";
import { IController } from "../protocols/Controller";

export class RegistrarCarroController {
  async handler(req: Request, res: Response) {
    const { modelo, marca, placa, status, cor } = req.body;
    const repo = new CarRepository();
    let result = await new RegisterCarUseCase(repo).execute({
      modelo,
      marca,
      placa,
      status,
      cor,
    });
    return res.json(result);
  }
}
