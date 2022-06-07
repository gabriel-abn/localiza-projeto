import { 
  IHistoricoRepository 
} from "../../../application/repository/HistoricoRepositoryInterface";
import { HistoryDTO } from "../../../domain/History";

import { prismaClient } from "./prismaClient";

export class HistoricoRepository implements IHistoricoRepository {
  async arquivarRegistro(history: HistoryDTO): Promise<HistoryDTO> {
    const response = await prismaClient.historico.create({
      data: {
        cliente: {
          connect: {
            cnh: history.clienteCnh,
          },
        },
        carro: {
          connect: {
            placa: history.carroPlaca,
          },
        },
      },
    });

    return response;
  }
  async getHistoryByCNH(cnh: string): Promise<HistoryDTO[]> {
    const response = await prismaClient.historico.findMany({
      where: {
        clienteCnh: cnh,
      },
    });

    return response;
  }
  async getHistoryByPlaca(placa: string): Promise<HistoryDTO[]> {
    const response = await prismaClient.historico.findMany({
      where: {
        carroPlaca: placa,
      },
    });

    return response;
  }
}
