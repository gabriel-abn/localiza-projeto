import { Car } from "../../domain/Car";
import { Client } from "../../domain/Client";
import { CarRepository } from "../repository/CarRepository";
import { ClientRepository } from "../repository/ClientRepository";

type DevolucaoVeiculoUseCaseDTO = {
  placa: string;
  cnh: string;
};

export class DevolucaoVeiculoUseCase {
  constructor(
    private readonly carRepo: CarRepository,
    private readonly clientRepo: ClientRepository
  ) {}

  async execute(props: DevolucaoVeiculoUseCaseDTO) {
    const devolucao = {
      carro: await this.carRepo
        .procurarPorPlaca(props.placa)
        .then((res: Car) => res)
        .catch((err: Error) => err),
      cliente: await this.clientRepo
        .procurarPorCNH(props.cnh)
        .then((res: Client) => res)
        .catch((err: Error) => err),
    };

    if (devolucao.cliente instanceof Error) {
      return new Error("Cliente não encontrado: " + devolucao.cliente.message);
    }
    if (devolucao.carro instanceof Error) {
      return new Error("Carro não encontrado: " + devolucao.carro.message);
    }

    const response = {
      carroLivre: await this.carRepo
        .liberarCarro(devolucao.carro)
        .then((res: Car) => res)
        .catch((err: Error) => err),
      cliente: await this.clientRepo
        .entregarCarro(devolucao.cliente)
        .then((res: Client) => res)
        .catch((err: Error) => err),
    };

    return response;
  }
}
