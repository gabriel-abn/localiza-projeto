import { Carro, CarroDTO, CarroStatus } from "../../domain/Carro";
import { Cliente, ClienteDTO } from "../../domain/Cliente";
import { CarRepository } from "../../infra/repositories/prisma/CarroRepository";
import { ClientRepository } from "../../infra/repositories/prisma/ClienteRepository";

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

    const reservarCarro = Carro.create({ ...carro });

    const reserva = {
      car: await this.carRepo.reservaDeCarro(reservarCarro),
    };

    return reserva;
  }
}
