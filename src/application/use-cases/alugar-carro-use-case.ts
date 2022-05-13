import { Car, CarroDTO, CarroStatus } from "../../domain/Car";
import { Client, ClienteDTO } from "../../domain/Client";
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
    const cliente = await this.clientRepo
      .procurarPorCNH(props.cnh)
      .then((res: ClienteDTO) => {
        return res;
      })
      .catch((err: Error) => {
        return err;
      });

    if (cliente instanceof Error) {
      return new Error(cliente.message);
    }
    const carro = await this.carRepo
      .procurarPorPlaca(props.placaCarro)
      .then((res: CarroDTO) => {
        return res;
      })
      .catch((err: Error) => {
        return err;
      });

    if (carro instanceof Error) {
      return new Error(carro.message);
    }

    console.log(carro);

    if (
      carro.status == CarroStatus.indisponivel ||
      carro.status == CarroStatus.reservado
    ) {
      return new Error("Carro já está em uso.");
    }
    const request = {
      client: Client.create(cliente),
      car: Car.create(carro),
    };

    const response = {
      cliente: await this.clientRepo
        .alugarCarro(request.client, request.car.props.placa)
        .then((res) => {
          return res;
        }),
      carro: await this.carRepo
        .aluguelDeCarro(request.car)
        .then((res: CarroDTO) => res)
        .catch((err: Error) => err),
    };

    return response;
  }
}
