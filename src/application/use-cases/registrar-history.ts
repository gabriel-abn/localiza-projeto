import { History, HistoryDTO } from "../../domain/History";
import { IHistoricoRepository } from "../repository/HistoricoRepositoryInterface";

type RegisterHistoryUseCaseDTO = {
  clienteCnh: string;
  carroPlaca: string;
  dataAlocacao: Date;
  dataDevolucao?: Date;
  ativo: boolean
};

export class RegisterHistoryUseCase {
  constructor(private readonly historyRepo: IHistoricoRepository) {}

  async execute(props: RegisterHistoryUseCaseDTO) {
    const history = History.create({ ...props });

    const response = await this.historyRepo
      .arquivarRegistro({...history.props})
      .then((res: HistoryDTO) => {
        return res;
      })
      .catch((err: Error) => {
        return new Error("Não foi possível cadastrar o carro.");
      });

    return response;
  }
}
