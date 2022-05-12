import { IPrismaClientRepository } from "../../../application/repository/prisma/PrismaClientRepository";
import { Client, ClientDTO } from "../../../domain/Client";

export class PrismaClientRepository implements IPrismaClientRepository {
  registrar(cliente: Client): Promise<ClientDTO> {
    throw new Error("Method not implemented.");
  }
  procurarPorCNH(cnh: string): Promise<Error | ClientDTO> {
    throw new Error("Method not implemented.");
  }
  alugarCarro(cliente: Client, placaCarro: string): Promise<ClientDTO> {
    throw new Error("Method not implemented.");
  }
  reservarCarro(cliente: Client, placaCarro: string): Promise<ClientDTO> {
    throw new Error("Method not implemented.");
  }
  entregarCarro(cliente: Client): Promise<ClientDTO> {
    throw new Error("Method not implemented.");
  }
}
