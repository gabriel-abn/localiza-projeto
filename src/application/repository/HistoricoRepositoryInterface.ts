import { CarroDTO } from "../../domain/Carro";
import { ClienteDTO } from "../../domain/Cliente";

export enum TipoArquivo {
  aluguel = "ALUGUEL",
  reserva = "RESERVA",
  devolucao = "DEVOLUCAO",
}

export type HistoricoDTO = {
  clienteCnh: string;
  carroPlaca: string;
  id: string;
  dataAlocacao: Date;
  dataDevolucao?: Date;
};

export interface IHistoricoRepository {
  arquivarRegistro(carro: CarroDTO, cliente: ClienteDTO): Promise<HistoricoDTO>;
  recuperarRegistro(placa: string, cnh: string): Promise<HistoricoDTO>;
}
