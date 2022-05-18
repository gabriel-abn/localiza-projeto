import { ICarRepository } from "../../../application/repository/CarroRepositoryInterface";
import { Carro, CarroDTO, CarroStatus } from "../../../domain/Carro";
import { prismaClient } from "./prismaClient";

export class CarRepository implements ICarRepository {
  async registrar(carro: Carro): Promise<CarroDTO> {
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
  async aluguelDeCarro(carro: Carro): Promise<CarroDTO> {
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
  async reservaDeCarro(carro: Carro): Promise<CarroDTO> {
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
  async liberarCarro(carro: Carro): Promise<CarroDTO> {
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
