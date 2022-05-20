import { Carro, CarroDTO } from "../../domain/Carro";
import { Cliente, ClienteDTO } from "../../domain/Cliente";
import { ICarRepository } from "../repository/CarroRepositoryInterface";
import { IClientRepository } from "../repository/ClienteRepositoryInterface";

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
      client: Cliente.create({ ...devolucao.cliente }),
      car: Carro.create({ ...devolucao.carro }),
    };
    const response = {
      carroLivre: await this.carRepo
        .liberarCarro(request.car)
        .then((res: CarroDTO) => res),
      cliente: await this.clientRepo
        .entregarCarro(request.client)
        .then((res: ClienteDTO) => res),
    };

    return response;
  }
}
