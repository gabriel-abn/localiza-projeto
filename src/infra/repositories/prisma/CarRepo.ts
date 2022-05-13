import { Carro } from "@prisma/client";
import { CarRepository } from "../../../application/repository/CarRepository";
import { Car, CarroDTO, CarroStatus } from "../../../domain/Car";
import { prismaClient } from "./prismaClient";

export class PrismaCarRepository implements CarRepository {
  async registrar(carro: Car): Promise<CarroDTO> {
    const response = await prismaClient()
      .carro.create({
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
  async procurarPorPlaca(placa: string): Promise<Error | CarroDTO> {
    const response = await prismaClient()
      .carro.findFirst({
        where: {
          placa,
        },
      })
      .then((res: CarroDTO) => res);

    return response;
  }
  async aluguelDeCarro(carro: Car): Promise<CarroDTO> {
    const response = await prismaClient().carro.update({
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
    throw new Error("Method not implemented.");
  }
  async liberarCarro(carro: Car): Promise<CarroDTO> {
    throw new Error("Method not implemented.");
  }
}
