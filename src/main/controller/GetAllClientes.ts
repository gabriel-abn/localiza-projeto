import { Request, Response } from "express";
import { ClientRepository } from "../../infra/repositories/prisma/ClienteRepository";

export class GetAllClientes {
  async handler(req: Request, res: Response) {
    const repo = new ClientRepository();
    const result = await repo.procurarTodosClientes().then((res) => res);

    return res.json(result);
  }
}
