import { Request, Response } from "express";
import { HistoricoRepository } from "../../infra/repositories/prisma/HistoricoRepository";

export class GetClienteHistoricoController {
  async handler(req: Request, res: Response) {
    const { clienteCnh, carroPlaca, dataAlocacao, ativo } = req.body;
    const repo = new HistoricoRepository();
    const response = await repo.arquivarRegistro({carroPlaca, clienteCnh, dataAlocacao, ativo});

    return res.json(response);
  }
}
