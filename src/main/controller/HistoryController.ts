import { Request, Response } from "express";
import { RegisterHistoryUseCase } from "../../application/use-cases/registrar-history";
import { AlugarCarroUseCase } from "../../application/use-cases/alugar-carro";
import { DevolucaoVeiculoUseCase } from "../../application/use-cases/devolucao-veiculo";
import { RenovateVeiculoUseCase } from "../../application/use-cases/renovate-veiculo";
import { CarRepository } from "../../infra/repositories/prisma/CarroRepository";
import { HistoricoRepository } from "../../infra/repositories/prisma/HistoricoRepository";
import { ClientRepository } from "../../infra/repositories/prisma/ClienteRepository";
import { HistoryDTO } from "../../domain/History";

export class HistoryController {
  async register(req: Request, res: Response) {
    const { clienteCnh, carroPlaca, dataAlocacao, ativo } = req.body;
    const repo = new HistoricoRepository();
    let result = await new RegisterHistoryUseCase(repo).execute({
      carroPlaca,
      clienteCnh,
      dataAlocacao,
      ativo
    });
    return res.json(result);
  }

  async alugar(req: Request, res: Response) {
    const { clienteCnh, carroPlaca, dataAlocacao, dataDevolucao, ativo } = req.body;
    const historyRepo = new HistoricoRepository();
    const carRepo = new CarRepository();
    const clienteRepo = new ClientRepository();

    let resultCar = await new AlugarCarroUseCase(clienteRepo, carRepo, historyRepo).execute({
      clienteCnh,
      carroPlaca,
      dataAlocacao,
      dataDevolucao,
      ativo,
    })

    return res.json({
      ... resultCar
    });
  }

  async devolver(req: Request, res: Response) {
    const { carroPlaca, dataAlocacao, dataDevolucao, clienteCnh, id }: HistoryDTO = req.body;
    const historyRepo = new HistoricoRepository();
    const carRepo = new CarRepository();

    let resultCar = await new DevolucaoVeiculoUseCase(carRepo, historyRepo).execute({
      id,
      carroPlaca,
      clienteCnh,
      dataAlocacao,
      dataDevolucao,
      ativo: false
    })
    return res.json({
      ... resultCar
    });
  }

  async renovate(req: Request, res: Response) {
    const { carroPlaca, dataAlocacao, dataDevolucao, clienteCnh, id }: HistoryDTO = req.body;
    const historyRepo = new HistoricoRepository();
    const carRepo = new CarRepository();


    let resultCar = await new RenovateVeiculoUseCase(carRepo, historyRepo).execute({
      id,
      carroPlaca,
      clienteCnh,
      dataAlocacao,
      dataDevolucao,
      ativo: true
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
