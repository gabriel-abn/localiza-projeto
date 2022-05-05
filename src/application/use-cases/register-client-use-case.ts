import { Client } from "../../domain/Client";
import { CarRepository } from "../repository/CarRepository";
import { ClientRepository } from "../repository/ClientRepository";

type RegisterClientUseCaseDTO = {
  rg: string;
  nome: string;
  placaCarro?: string;
};

export class RegisterClientUseCase {
  constructor(
    private readonly clientRepo: ClientRepository,
    private readonly carroRepo: CarRepository
  ) {}

  async execute(props: RegisterClientUseCaseDTO) {
    const car = await this.carroRepo
      .procurarPorPlaca(props.placaCarro)
      .catch(() => {
        throw new Error("Carro não encontrado");
      });

    const client = Client.create({ ...props });
    const response = this.clientRepo
      .registrar(client)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return new Error(err);
      });

    return response;
  }
}
