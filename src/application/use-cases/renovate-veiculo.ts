import { Carro, CarroDTO } from "../../domain/Carro";
import { History, HistoryDTO } from "../../domain/History";
import { ICarRepository } from "../repository/CarroRepositoryInterface";
import { IHistoricoRepository } from "../repository/HistoricoRepositoryInterface";

interface RenovateVeiculoUseCaseDTO extends HistoryDTO {};

export class RenovateVeiculoUseCase {
  constructor(
    private readonly carRepo: ICarRepository,
    private readonly historyRepo: IHistoricoRepository
  ) {}

  async execute(props: RenovateVeiculoUseCaseDTO) {
    const renovate = {
      carro: await this.carRepo
        .procurarPorPlaca(props.carroPlaca)
        .then((res: CarroDTO) => res),
    };

    if (renovate.carro instanceof Error) {
      return new Error("Carro não encontrado: " + renovate.carro.message);
    }

    const request = {
      history: History.create({ ...props }),
      car: Carro.create({ ...renovate.carro }),
    };
    
    const response = {
      carroLivre: await this.carRepo
        .liberarCarro(request.car)
        .then((res: CarroDTO) => res),
      history: await this.historyRepo
        .renovarVeiculo(request.history)
        .then((res: HistoryDTO) => res),
    };

    return response;
  }
}
