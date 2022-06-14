import { 
  IHistoricoRepository 
} from "../../../application/repository/HistoricoRepositoryInterface";
import { History, HistoryDTO } from "../../../domain/History";

import { prismaClient } from "./prismaClient";

export class HistoricoRepository implements IHistoricoRepository {
  async arquivarRegistro(history: History): Promise<HistoryDTO> {
    const response = await prismaClient.historico.create({
      data: {
        ... history
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
