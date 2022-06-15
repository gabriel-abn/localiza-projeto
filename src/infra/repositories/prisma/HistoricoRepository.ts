import { 
  IHistoricoRepository 
} from "../../../application/repository/HistoricoRepositoryInterface";
import { History, HistoryDTO } from "../../../domain/History";

import { prismaClient } from "./prismaClient";

export class HistoricoRepository implements IHistoricoRepository {
  async arquivarRegistro(history: History): Promise<HistoryDTO> {
    const response = await prismaClient.historico.create({
      data: {
        carro: {
          connect: {
            placa: history.props.carroPlaca
          }
        },
        cliente: {
          connect: {
            cnh: history.props.clienteCnh
          }
        },
        ativo: history.props.ativo,
        dataAlocacao: history.props.dataAlocacao,
        dataDevolucao: history.props.dataDevolucao
      },
    });

    return response;
  }
  async devolverVeiculo(history: History): Promise<HistoryDTO> {
    const response = await prismaClient.historico.update({
      where: {
        id: history.props.id
      },
      data: {
        ativo: false
      }
    });

    return response;
  }
  async renovarVeiculo(history: History): Promise<HistoryDTO> {
    const response = await prismaClient.historico.update({
      where: {
        id: history.props.id
      },
      data: {
        ativo: true,
        dataDevolucao: history.props.dataDevolucao
      }
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
