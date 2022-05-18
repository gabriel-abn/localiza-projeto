import { Cliente, ClienteDTO } from "../../domain/Cliente";

export interface IClientRepository {
  registrar(cliente: Cliente): Promise<ClienteDTO>;
  procurarPorCNH(cnh: string): Promise<ClienteDTO | Error>;
  alugarCarro(cliente: Cliente, placaCarro: string): Promise<ClienteDTO>;
  reservarCarro(cliente: Cliente, placaCarro: string): Promise<ClienteDTO>;
  entregarCarro(cliente: Cliente): Promise<ClienteDTO>;
}
