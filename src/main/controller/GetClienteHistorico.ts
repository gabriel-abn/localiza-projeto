import { Request, Response } from "express";
import { HistoricoRepository } from "../../infra/repositories/prisma/HistoricoRepository";

export class GetClienteHistoricoController {
  async handler(req: Request, res: Response) {
    const { cnh } = req.body;
    const repo = new HistoricoRepository();
    const response = await repo.recuperarRegistro(cnh);

    return res.json(response);
  }
}
