import { Car, CarroDTO, CarroStatus } from "../../domain/Car";
import { Client, ClienteDTO } from "../../domain/Client";
import { ICarRepository } from "../repository/CarRepositoryInterface";
import { IClientRepository } from "../repository/ClientRepositoryInterface";

type AlugarCarroUseCaseDTO = {
  cnh: string;
  placaCarro: string;
};

export class AlugarCarroUseCase {
  constructor(
    private readonly clientRepo: IClientRepository,
    private readonly carRepo: ICarRepository
  ) {}

  async execute(props: AlugarCarroUseCaseDTO) {
    const cliente = await this.clientRepo
      .procurarPorCNH(props.cnh)
      .then((res: ClienteDTO) => {
        return res;
      });

    if (!cliente) {
      return new Error("Cliente não encontrado");
    }
    const carro = await this.carRepo
      .procurarPorPlaca(props.placaCarro)
      .then((res: CarroDTO) => {
        return res;
      });

    if (!carro) {
      return new Error("Carro não encontrado");
    }
    if (
      carro.status == CarroStatus.indisponivel ||
      carro.status == CarroStatus.reservado
    ) {
      return new Error("Carro já está em uso.");
    }
    const request = {
      client: Client.create({ ...cliente }),
      car: Car.create({ ...carro }),
    };

    const response = {
      cliente: await this.clientRepo
        .alugarCarro(request.client, request.car.props.placa)
        .then((res) => {
          return res;
        }),
      carro: await this.carRepo
        .aluguelDeCarro(request.car)
        .then((res: CarroDTO) => res),
    };

    return response;
  }
}
