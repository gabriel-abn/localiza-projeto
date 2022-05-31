import { Request, Response } from "express";
import { RegisterClientUseCase } from "../../application/use-cases/registrar-cliente";
import { ClientRepository } from "../../infra/repositories/prisma/ClienteRepository";

export class RegistrarClienteController {
  async handler(req: Request, res: Response) {
    const {
      nome,
      cpf,
      cnh,
      dataNascimento,
      endereco,
      telefone,
      email,
      cartao,
      senhaAcesso,
      carroPlaca,
    } = req.body;
    const repo = new ClientRepository();
    let result = await new RegisterClientUseCase(repo)
      .execute({
        nome,
        cpf,
        cnh,
        dataNascimento,
        endereco,
        telefone,
        email,
        cartao,
        senhaAcesso,
        carroPlaca,
      })
      .catch((err: Error) => err);
    console.log(result);
    return res.json(result);
  }
}
