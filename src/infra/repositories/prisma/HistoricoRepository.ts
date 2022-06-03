import {
  HistoricoDTO,
  IHistoricoRepository,
} from "../../../application/repository/HistoricoRepositoryInterface";
import { CarroDTO } from "../../../domain/Carro";
import { ClienteDTO } from "../../../domain/Cliente";
import { prismaClient } from "./prismaClient";

export class HistoricoRepository implements IHistoricoRepository {
  async arquivarRegistro(
    carro: CarroDTO,
    cliente: ClienteDTO
  ): Promise<HistoricoDTO> {
    const response = await prismaClient.historico.create({
      data: {
        cliente: {
          connect: {
            cnh: cliente.cnh,
          },
        },
        carro: {
          connect: {
            placa: carro.placa,
          },
        },
      },
    });

    return response;
  }
  async recuperarRegistro(cnh: string): Promise<HistoricoDTO> {
    const response = await prismaClient.historico.findFirst({
      where: {
        clienteCnh: cnh,
      },
    });

    return response;
  }
}
