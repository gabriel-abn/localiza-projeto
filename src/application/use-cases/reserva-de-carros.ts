import { Car } from "../../domain/Car";
import { Client } from "../../domain/Client";
import { CarRepository } from "../repository/CarRepository";
import { ClientRepository } from "../repository/ClientRepository";

type ReservaDeCarroUseCaseDTO = {
  placaCarro: string;
  cnh: string;
};

export class ReservaDeCarroUseCase {
  constructor(
    private readonly carRepo: CarRepository,
    private readonly clientRepo: ClientRepository
  ) {}

  async execute(props: ReservaDeCarroUseCaseDTO) {
    const carro = await this.carRepo
      .procurarPorPlaca(props.placaCarro)
      .then((car: Car) => {
        return car;
      })
      .catch((err: Error) => {
        return err;
      });

    if (carro instanceof Error) {
      return new Error("Carro não cadastrado");
    }

    const cliente = await this.clientRepo
      .procurarPorCNH(props.cnh)
      .then((client: Client) => {
        return client;
      })
      .catch((err: Error) => {
        return err;
      });

    if (cliente instanceof Error) {
      return new Error("Cliente não encontrado");
    }

    const reserva = {
      client: await this.clientRepo
        .reservarCarro(cliente, carro.props.placa)
        .then((res) => {
          return res;
        }),
      car: await this.carRepo.reservaDeCarro(carro).then((res) => {
        return res;
      }),
    };
  }
}
