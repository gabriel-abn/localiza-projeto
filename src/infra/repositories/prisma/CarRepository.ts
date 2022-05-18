import { ICarRepository } from "../../../application/repository/CarRepositoryInterface";
import { Car, CarroDTO, CarroStatus } from "../../../domain/Car";
import { prismaClient } from "./prismaClient";

export class CarRepository implements ICarRepository {
  async registrar(carro: Car): Promise<CarroDTO> {
    const response = await prismaClient.carro
      .create({
        data: {
          ...carro.props,
        },
      })
      .then((res: CarroDTO) => res);

    if (!response) {
      throw new Error("Não foi possível registrar carro");
    }

    return response;
  }
  async procurarPorPlaca(placa: string): Promise<CarroDTO> {
    const response = await prismaClient.carro
      .findFirst({
        where: {
          placa,
        },
      })
      .then((res: CarroDTO) => res);

    return response;
  }
  async aluguelDeCarro(carro: Car): Promise<CarroDTO> {
    const response = await prismaClient.carro.update({
      where: {
        placa: carro.props.placa,
      },
      data: {
        status: CarroStatus.indisponivel,
      },
    });

    return response;
  }
  async reservaDeCarro(carro: Car): Promise<CarroDTO> {
    const response = await prismaClient.carro.update({
      where: {
        placa: carro.props.placa,
      },
      data: {
        status: CarroStatus.reservado,
      },
    });

    return response;
  }
  async liberarCarro(carro: Car): Promise<CarroDTO> {
    const response = await prismaClient.carro.update({
      where: {
        placa: carro.props.placa,
      },
      data: {
        status: CarroStatus.disponivel,
      },
    });

    return response;
  }
}
