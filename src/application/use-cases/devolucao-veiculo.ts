import { Carro, CarroDTO } from "../../domain/Carro";
import { History, HistoryDTO } from "../../domain/History";
import { ICarRepository } from "../repository/CarroRepositoryInterface";
import { IHistoricoRepository } from "../repository/HistoricoRepositoryInterface";

interface DevolucaoVeiculoUseCaseDTO extends HistoryDTO {};

export class DevolucaoVeiculoUseCase {
  constructor(
    private readonly carRepo: ICarRepository,
    private readonly historyRepo: IHistoricoRepository
  ) {}

  async execute(props: DevolucaoVeiculoUseCaseDTO) {
    const devolucao = {
      carro: await this.carRepo
        .procurarPorPlaca(props.carroPlaca)
        .then((res: CarroDTO) => res),
    };

    if (devolucao.carro instanceof Error) {
      return new Error("Carro não encontrado: " + devolucao.carro.message);
    }

    const request = {
      history: History.create({ ...props }),
      car: Carro.create({ ...devolucao.carro }),
    };
    const response = {
      carroLivre: await this.carRepo
        .liberarCarro(request.car)
        .then((res: CarroDTO) => res),
        history: await this.historyRepo
        .arquivarRegistro(request.history)
        .then((res: HistoryDTO) => res),
    };

    return response;
  }
}
