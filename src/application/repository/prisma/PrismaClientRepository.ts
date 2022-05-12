import { Client, ClientDTO } from "../../../domain/Client";

export interface IPrismaClientRepository {
  registrar(cliente: Client): Promise<ClientDTO>;
  procurarPorCNH(cnh: string): Promise<ClientDTO | Error>;
  alugarCarro(cliente: Client, placaCarro: string): Promise<ClientDTO>;
  reservarCarro(cliente: Client, placaCarro: string): Promise<ClientDTO>;
  entregarCarro(cliente: Client): Promise<ClientDTO>;
}
