import { Client } from "../../domain/Client";

export interface ClientRepository {
  registrar(cliente: Client): Promise<Client>;
  procurarPorRG(rg: string): Promise<Client | Error>;
}