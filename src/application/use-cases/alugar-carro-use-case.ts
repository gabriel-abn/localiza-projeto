import { Car } from "../../domain/Car";
import { Client } from "../../domain/Client";
import { CarRepository } from "../repository/CarRepository";
import { ClientRepository } from "../repository/ClientRepository";

type AlugarCarroUseCaseDTO = {
  rg: string;
  placaCarro: string;
};

export class AlugarCarroUseCase {
  constructor(
    private readonly clientRepo: ClientRepository,
    private readonly carRepo: CarRepository
  ) {}

  async execute(props: AlugarCarroUseCaseDTO) {
    const client = await this.clientRepo
      .procurarPorRG(props.rg)
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

    const response = await this.clientRepo
      .aluguelDeCarro(client, car.props.placa)
      .then((res) => {
        return res;
      });

    return response;
  }
}
