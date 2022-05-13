import { Client } from "../../domain/Client";
import { ClientRepository } from "../repository/ClientRepository";

type RegisterClientUseCaseDTO = {
  nome: string;
  cpf: string;
  cnh: string;
  dataNascimento: Date;
  endereco: string;
  telefone: string;
  email: string;
  cartao: string;
  senhaAcesso: string;
  carroPlaca: string;
};

export class RegisterClientUseCase {
  constructor(private readonly clientRepo: ClientRepository) {}

  async execute(props: RegisterClientUseCaseDTO) {
    const client = Client.create({ ...props });
    const response = await this.clientRepo
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
