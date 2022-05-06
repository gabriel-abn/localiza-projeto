import { Client } from "../../domain/Client";
import { CarRepository } from "../repository/CarRepository";
import { ClientRepository } from "../repository/ClientRepository";

type RegisterClientUseCaseDTO = {
  rg: string;
  nome: string;
  placaCarro?: string;
};

export class RegisterClientUseCase {
  constructor(private readonly clientRepo: ClientRepository) {}

  async execute(props: RegisterClientUseCaseDTO) {
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
