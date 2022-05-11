import { Client } from "../../domain/Client";

export interface ClientRepository {
  registrar(cliente: Client): Promise<Client>;
  procurarPorCNH(cnh: string): Promise<Client | Error>;
  alugarCarro(cliente: Client, placaCarro: string): Promise<Client>;
  reservarCarro(cliente: Client, placaCarro: string): Promise<Client>;
  entregarCarro(cliente: Client): Promise<Client>;
}
