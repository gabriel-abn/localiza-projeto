import { HistoryDTO } from "../../domain/History";

export interface IHistoricoRepository {
  arquivarRegistro(history: HistoryDTO): Promise<HistoryDTO>;
  getHistoryByCNH(cnh: string): Promise<HistoryDTO[]>;
  getHistoryByPlaca(placa: string): Promise<HistoryDTO[]>;
}
