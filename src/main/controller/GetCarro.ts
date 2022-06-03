import { Request, Response } from "express";
import { CarRepository } from "../../infra/repositories/prisma/CarroRepository";

export class GetCarroController {
  async handler(req: Request, res: Response) {
    const { placa } = req.body;
    const repo = new CarRepository();
    const response = await repo.procurarPorPlaca(placa);

    return res.json(response);
  }
}
