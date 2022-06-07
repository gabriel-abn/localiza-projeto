import { Request, Response } from "express";
import { RegisterHistoryUseCase } from "../../application/use-cases/registrar-history";
import { AlugarCarroUseCase } from "../../application/use-cases/alugar-carro";
import { CarRepository } from "../../infra/repositories/prisma/CarroRepository";
import { HistoricoRepository } from "../../infra/repositories/prisma/HistoricoRepository";
import { ClientRepository } from "../../infra/repositories/prisma/ClienteRepository";

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

  async alugar(req: Request, res: Response) {
    const { clienteCnh, carroPlaca, dataAlocacao, dataDevolucao } = req.body;
    const historyRepo = new HistoricoRepository();
    const carRepo = new CarRepository();
    const clienteRepo = new ClientRepository();

    let resultCar = await new AlugarCarroUseCase(clienteRepo ,carRepo, historyRepo).execute({
      cnh: clienteCnh,
      placaCarro: carroPlaca,
      dataAlocacao,
      dataDevolucao
    })
    return res.json({
      ... resultCar
    });
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
