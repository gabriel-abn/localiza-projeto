import { Cliente } from "../../domain/Cliente";
import { IClientRepository } from "../repository/ClienteRepositoryInterface";

type RegisterClientUseCaseDTO = {
  nome: string;
  cnh: string;
  telefone: string;
  email: string;
  senhaAcesso: string;
  isAdmin?: boolean;
};

export class RegisterClientUseCase {
  constructor(private readonly clientRepo: IClientRepository) {}

  async execute(props: RegisterClientUseCaseDTO) {
    const client = Cliente.create({ ...props });
    const response = await this.clientRepo.registrar(client).then((res) => {
      return res;
    });
    return response;
  }
}
