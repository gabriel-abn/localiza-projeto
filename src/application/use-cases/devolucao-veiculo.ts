import { Car, CarroDTO } from "../../domain/Car";
import { Client, ClienteDTO } from "../../domain/Client";
import { ICarRepository } from "../repository/CarRepository";
import { IClientRepository } from "../repository/ClientRepository";

type DevolucaoVeiculoUseCaseDTO = {
  cnh: string;
  placaCarro: string;
};

export class DevolucaoVeiculoUseCase {
  constructor(
    private readonly carRepo: ICarRepository,
    private readonly clientRepo: IClientRepository
  ) {}

  async execute(props: DevolucaoVeiculoUseCaseDTO) {
    const devolucao = {
      carro: await this.carRepo
        .procurarPorPlaca(props.placaCarro)
        .then((res: CarroDTO) => res),
      cliente: await this.clientRepo
        .procurarPorCNH(props.cnh)
        .then((res: ClienteDTO) => res),
    };

    if (devolucao.cliente instanceof Error) {
      return new Error("Cliente não encontrado: " + devolucao.cliente.message);
    }
    if (devolucao.carro instanceof Error) {
      return new Error("Carro não encontrado: " + devolucao.carro.message);
    }

    const request = {
      client: Client.create(devolucao.cliente),
      car: Car.create(devolucao.carro),
    };
    const response = {
      carroLivre: await this.carRepo
        .liberarCarro(request.car)
        .then((res: CarroDTO) => res)
        .catch((err: Error) => err),
      cliente: await this.clientRepo
        .entregarCarro(request.client)
        .then((res: ClienteDTO) => res)
        .catch((err: Error) => err),
    };

    return response;
  }
}
