import { Request, Response } from "express";
import { RegisterClientUseCase } from "../../application/use-cases/registrar-cliente";
import { ClientRepository } from "../../infra/repositories/prisma/ClienteRepository";

export class RegistrarClienteController {
  async handler(req: Request, res: Response) {
    const {
      nome,
      cnh,
      telefone,
      email,
      senhaAcesso,
      isAdmin
    } = req.body;
    const repo = new ClientRepository();
    let result = await new RegisterClientUseCase(repo)
      .execute({
        nome,
        cnh,
        telefone,
        email,
        senhaAcesso,
        isAdmin,
      })
      .catch((err: Error) => err);
    return res.json(result);
  }
}
