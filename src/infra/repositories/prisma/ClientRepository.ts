import { IClientRepository } from "../../../application/repository/ClientRepositoryInterface";
import { Client, ClienteDTO } from "../../../domain/Client";
import { prismaClient } from "./prismaClient";

export class ClientRepository implements IClientRepository {
  async registrar(cliente: Client): Promise<ClienteDTO> {
    const response = await prismaClient.cliente.create({
      data: {
        ...cliente.props,
      },
    });

    return { ...response };
  }
  async procurarPorCNH(cnh: string): Promise<ClienteDTO> {
    const response = await prismaClient.cliente
      .findFirst({
        where: {
          cnh,
        },
      })
      .then((res: ClienteDTO) => res);

    return response;
  }
  async alugarCarro(cliente: Client, placaCarro: string): Promise<ClienteDTO> {
    const response = await prismaClient.cliente.update({
      where: {
        cnh: cliente.props.cnh,
      },
      data: {
        placa: {
          connect: {
            placa: placaCarro,
          },
        },
      },
    });

    return response;
  }
  async reservarCarro(
    cliente: Client,
    placaCarro: string
  ): Promise<ClienteDTO> {
    const response = await prismaClient.cliente.update({
      where: {
        cnh: cliente.props.cnh,
      },
      data: {
        carroPlaca: placaCarro,
      },
    });

    return response;
  }
  async entregarCarro(cliente: Client): Promise<ClienteDTO> {
    const response = await prismaClient.cliente.update({
      where: {
        cnh: cliente.props.cnh,
      },
      data: {
        carroPlaca: null,
      },
    });

    return response;
  }
}
