import { Carro, CarroDTO, CarroStatus } from "../../domain/Carro";
import { ClienteDTO } from "../../domain/Cliente";
import { HistoryDTO } from "../../domain/History";
import { ICarRepository } from "../repository/CarroRepositoryInterface";
import { IClientRepository } from "../repository/ClienteRepositoryInterface";
import { IHistoricoRepository } from "../repository/HistoricoRepositoryInterface";

type AlugarCarroUseCaseDTO = {
  carroPlaca: string
  dataAlocacao: Date
  dataDevolucao: Date
  clienteCnh: string
  ativo: boolean
};

export class AlugarCarroUseCase {
  constructor(
    private readonly clientRepo: IClientRepository,
    private readonly carRepo: ICarRepository,
    private readonly historicoRepo: IHistoricoRepository
  ) {}

  async execute(props: AlugarCarroUseCaseDTO) {
    const { dataAlocacao, dataDevolucao, ativo, carroPlaca, clienteCnh } = props;

    const cliente = await this.clientRepo
      .procurarPorCNH(props.clienteCnh)
      .then((res: ClienteDTO) => {
        return res;
      });

    if (!cliente) {
      return new Error("Cliente não encontrado");
    }

    const carro = await this.carRepo
      .procurarPorPlaca(props.carroPlaca)
      .then((res: CarroDTO) => {
        return res;
      });

    if (!carro) {
      return new Error("Carro não encontrado");
    }

    if (
      carro.status == CarroStatus.indisponivel ||
      carro.status == CarroStatus.reservado
    ) {
      return new Error("Carro já está em uso.");
    }

    const request = {
      car: Carro.create({ ...carro }),
    };

    const response = {
      carro: await this.carRepo
        .aluguelDeCarro(request.car)
        .then((res: CarroDTO) => res),
      history: await this.historicoRepo
        .arquivarRegistro({
          ativo,
          carroPlaca,
          clienteCnh,
          dataAlocacao,
          dataDevolucao
        })
        .then((res: HistoryDTO) => res)
    };

    return {
      ... response
    };
  }
}
