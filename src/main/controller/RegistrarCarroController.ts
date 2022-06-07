import { Request, Response } from "express";
import { RegisterCarUseCase } from "../../application/use-cases/registrar-carro";
import { CarRepository } from "../../infra/repositories/prisma/CarroRepository";

export class RegistrarCarroController {
  async handler(req: Request, res: Response) {
    const { modelo, marca, placa, status, cor, image, price, ano, motor } = req.body;
    const repo = new CarRepository();
    let result = await new RegisterCarUseCase(repo).execute({
      modelo,
      marca,
      placa,
      status,
      cor,
      image,
      price,
      ano,
      motor
    });
    return res.json(result);
  }
}
