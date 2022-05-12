import { Carro } from "@prisma/client";
import { IPrismaCarRepository } from "../../../application/repository/prisma/PrismaCarRepository";
import { CarroDTO } from "../../../domain/abstract/Carro";
import { Car } from "../../../domain/Car";
import { prismaClient } from "./prismaClient";

export class PrismaCarRepository implements IPrismaCarRepository {
  async registrar(carro: Car): Promise<CarroDTO> {
    const response = await prismaClient()
      .carro.create({
        data: {
          cor: carro.props.cor,
          marca: carro.props.marca,
          modelo: carro.props.modelo,
          placa: carro.props.placa,
          status: carro.props.status,
        },
      })
      .then((res: Carro) => res);

    if (!response) {
      throw new Error("Não foi possível registrar carro");
    }

    return response;
  }
  async procurarPorPlaca(placa: string): Promise<Error | CarroDTO> {
    throw new Error("Method not implemented.");
  }
  async aluguelDeCarro(carro: Car): Promise<CarroDTO> {
    throw new Error("Method not implemented.");
  }
  async reservaDeCarro(carro: Car): Promise<CarroDTO> {
    throw new Error("Method not implemented.");
  }
  async liberarCarro(carro: Car): Promise<CarroDTO> {
    throw new Error("Method not implemented.");
  }
}
