import { Car, CarroDTO, CarroStatus } from "../../domain/Car";
import { Client, ClienteDTO } from "../../domain/Client";
import { CarRepository } from "../../infra/repositories/prisma/CarRepository";
import { ClientRepository } from "../../infra/repositories/prisma/ClientRepository";

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
      });

    if (!carro) {
      return new Error("Carro não cadastrado");
    }

    const cliente = await this.clientRepo
      .procurarPorCNH(props.cnh)
      .then((client: ClienteDTO) => {
        return client;
      });

    if (!cliente) {
      return new Error("Cliente não encontrado");
    }

    if (carro.status != CarroStatus.disponivel) {
      return new Error("Carro ocupado");
    }

    const reservarCliente = Client.create({ ...cliente });
    const reservarCarro = Car.create({ ...carro });

    const reserva = {
      client: await this.clientRepo.reservarCarro(reservarCliente, carro.placa),
      car: await this.carRepo.reservaDeCarro(reservarCarro),
    };

    return reserva;
  }
}
