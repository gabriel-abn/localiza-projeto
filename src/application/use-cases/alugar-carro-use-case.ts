import { Car, CarroStatus } from "../../domain/Car";
import { Client } from "../../domain/Client";
import { CarRepository } from "../repository/CarRepository";
import { ClientRepository } from "../repository/ClientRepository";

type AlugarCarroUseCaseDTO = {
  cnh: string;
  placaCarro: string;
};

export class AlugarCarroUseCase {
  constructor(
    private readonly clientRepo: ClientRepository,
    private readonly carRepo: CarRepository
  ) {}

  async execute(props: AlugarCarroUseCaseDTO) {
    const client = await this.clientRepo
      .procurarPorCNH(props.cnh)
      .then((res: Client) => {
        return res;
      })
      .catch((err) => {
        return err;
      });

    if (client instanceof Error) {
      return new Error(client.message);
    }
    const car = await this.carRepo
      .procurarPorPlaca(props.placaCarro)
      .then((res: Car) => {
        return res;
      })
      .catch((err: Error) => {
        return err;
      });

    if (car instanceof Error) {
      return new Error(car.message);
    }

    if (
      car.props.status == CarroStatus.indisponivel ||
      car.props.status == CarroStatus.reservado
    ) {
      return new Error("Carro já está em uso.");
    }

    const response = {
      cliente: await this.clientRepo
        .alugarCarro(client, car.props.placa)
        .then((res) => {
          return res;
        }),
      carro: await this.carRepo
        .aluguelDeCarro(car)
        .then((res: Car) => res)
        .catch((err: Error) => err),
    };

    return response;
  }
}
