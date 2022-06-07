import { Request, Response } from "express";
import { RegisterHistoryUseCase } from "../../application/use-cases/registrar-history";
import { HistoricoRepository } from "../../infra/repositories/prisma/HistoricoRepository";

export class HistoryController {
  async register(req: Request, res: Response) {
    const { clienteCnh, carroPlaca, dataAlocacao } = req.body;
    const repo = new HistoricoRepository();
    let result = await new RegisterHistoryUseCase(repo).execute({
      carroPlaca,
      clienteCnh,
      dataAlocacao
    });
    return res.json(result);
  }

  async getHistoryByCNH(req: Request, res: Response) {
    const { cnh } = req.body;
    const repo = new HistoricoRepository();
    const response = await repo.getHistoryByCNH(cnh);

    return res.json(response);
  }

  async getHistoryByPlaca(req: Request, res: Response) {
    const { placa } = req.body;
    const repo = new HistoricoRepository();
    const response = await repo.getHistoryByPlaca(placa);

    return res.json(response);
  }
}
