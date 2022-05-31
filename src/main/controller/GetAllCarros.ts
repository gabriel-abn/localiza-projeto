import { Request, Response } from "express";
import { CarRepository } from "../../infra/repositories/prisma/CarroRepository";

export class GetAllCarros {
  async handler(req: Request, res: Response) {
    const repo = new CarRepository();
    let result = await repo.retornarTodosCarros();
    return res.json(result);
  }
}
