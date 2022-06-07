import { Cliente, ClienteDTO } from "../../domain/Cliente";

export interface IClientRepository {
  registrar(cliente: Cliente): Promise<ClienteDTO>;
  procurarPorCNH(cnh: string): Promise<ClienteDTO | Error>;
  procurarTodosClientes(): Promise<ClienteDTO[]>;
}
