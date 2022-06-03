import { Carro, CarroDTO, CarroStatus } from "../../domain/Carro";
import { Cliente, ClienteDTO } from "../../domain/Cliente";
import { ICarRepository } from "../repository/CarroRepositoryInterface";
import { IClientRepository } from "../repository/ClienteRepositoryInterface";
import { IHistoricoRepository } from "../repository/HistoricoRepositoryInterface";

type AlugarCarroUseCaseDTO = {
  cnh: string;
  placaCarro: string;
};

export class AlugarCarroUseCase {
  constructor(
    private readonly clientRepo: IClientRepository,
    private readonly carRepo: ICarRepository,
    private readonly historicoRepo: IHistoricoRepository
  ) {}

  async execute(props: AlugarCarroUseCaseDTO) {
    const cliente = await this.clientRepo
      .procurarPorCNH(props.cnh)
      .then((res: ClienteDTO) => {
        return res;
      });

    if (!cliente) {
      return new Error("Cliente não encontrado");
    }
    const carro = await this.carRepo
      .procurarPorPlaca(props.placaCarro)
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
      client: Cliente.create({ ...cliente }),
      car: Carro.create({ ...carro }),
    };

    const response = {
      cliente: await this.clientRepo
        .alugarCarro(request.client, request.car.props.placa)
        .then((res) => {
          return res;
        }),
      carro: await this.carRepo
        .aluguelDeCarro(request.car)
        .then((res: CarroDTO) => res),
    };

    await this.historicoRepo.arquivarRegistro(response.carro, response.cliente);

    return response;
  }
}
