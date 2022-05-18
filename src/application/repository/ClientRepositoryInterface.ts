import { Client, ClienteDTO } from "../../domain/Client";

export interface IClientRepository {
  registrar(cliente: Client): Promise<ClienteDTO>;
  procurarPorCNH(cnh: string): Promise<ClienteDTO | Error>;
  alugarCarro(cliente: Client, placaCarro: string): Promise<ClienteDTO>;
  reservarCarro(cliente: Client, placaCarro: string): Promise<ClienteDTO>;
  entregarCarro(cliente: Client): Promise<ClienteDTO>;
}
