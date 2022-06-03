import { Request, Response } from "express";
import { ClientRepository } from "../../infra/repositories/prisma/ClienteRepository";

export class GetClienteController {
  async handler(req: Request, res: Response) {
    const { cnh } = req.body;
    const repo = new ClientRepository();
    const response = await repo.procurarPorCNH(cnh);

    return res.json(response);
  }
}
