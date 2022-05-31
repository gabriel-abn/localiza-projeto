import { IClientRepository } from "../../../application/repository/ClienteRepositoryInterface";
import { Cliente, ClienteDTO } from "../../../domain/Cliente";
import { prismaClient } from "./prismaClient";

export class ClientRepository implements IClientRepository {
  async procurarTodosClientes(): Promise<ClienteDTO[]> {
    const response = await prismaClient.cliente.findMany({});

    if (!response) {
      throw new Error("Sem clientes cadastrados");
    }

    return response;
  }
  async registrar(cliente: Cliente): Promise<ClienteDTO> {
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
  async alugarCarro(cliente: Cliente, placaCarro: string): Promise<ClienteDTO> {
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
    cliente: Cliente,
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
  async entregarCarro(cliente: Cliente): Promise<ClienteDTO> {
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
