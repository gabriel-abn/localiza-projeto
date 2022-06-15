import { History, HistoryDTO } from "../../domain/History";

export interface IHistoricoRepository {
  arquivarRegistro(history: History): Promise<HistoryDTO>;
  devolverVeiculo(history: History): Promise<HistoryDTO>;
  renovarVeiculo(history: History): Promise<HistoryDTO>;
  getHistoryByCNH(cnh: string): Promise<HistoryDTO[]>;
  getHistoryByPlaca(placa: string): Promise<HistoryDTO[]>;
}
