import { Car, CarroDTO } from "../../domain/Car";
import { Client, ClienteDTO } from "../../domain/Client";
import { CarRepository } from "../../infra/repositories/prisma/CarRepo";
import { ClientRepository } from "../../infra/repositories/prisma/ClientRepo";

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
      .then((car: CarroDTO) => {
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
      .then((client: ClienteDTO) => {
        return client;
      })
      .catch((err: Error) => {
        return err;
      });

    if (cliente instanceof Error) {
      return new Error("Cliente não encontrado");
    }

    const reservarCliente = Client.create(cliente);
    const reservarCarro = Car.create(carro);

    const reserva = {
      client: await this.clientRepo.reservarCarro(reservarCliente, carro.placa),
      car: await this.carRepo.reservaDeCarro(reservarCarro),
    };

    return reserva;
  }
}
