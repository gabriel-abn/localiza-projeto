import { AlugarCarroUseCase } from "../../../src/application/use-cases/alugar-carro";
import { DevolucaoVeiculoUseCase } from "../../../src/application/use-cases/devolucao-veiculo";
import { RegisterCarUseCase } from "../../../src/application/use-cases/registrar-carro";
import { RegisterClientUseCase } from "../../../src/application/use-cases/registrar-cliente";
import { ReservaDeCarroUseCase } from "../../../src/application/use-cases/reserva-de-carros";
import { CarroDTO } from "../../../src/domain/Carro";
import { ClienteDTO } from "../../../src/domain/Cliente";
import { CarRepository } from "../../../src/infra/repositories/prisma/CarroRepository";
import { ClientRepository } from "../../../src/infra/repositories/prisma/ClienteRepository";
import { HistoricoRepository } from "../../../src/infra/repositories/prisma/HistoricoRepository";
import { mockCarroDisponivel } from "../../domain/mocks/CarroMocks";
import { mockCliente } from "../../domain/mocks/ClienteMock";

const mocks = () => {
  const clienteMock = mockCliente();
  const carroDisponivel = mockCarroDisponivel();

  return { clienteMock, carroDisponivel };
};

const repositories = () => {
  const clienteRepo = new ClientRepository();
  const carroRepo = new CarRepository();
  const historicoRepo = new HistoricoRepository();

  return { clienteRepo, carroRepo, historicoRepo };
};

const makePreSuts = async () => {
  const { clienteRepo, carroRepo } = repositories();
  const { clienteMock, carroDisponivel } = mocks();
  const insert = {
    cnh: (
      await new RegisterClientUseCase(clienteRepo)
        .execute({ ...clienteMock.props })
        .then((res: ClienteDTO) => res)
    ).cnh,
    placaCarro: (
      await new RegisterCarUseCase(carroRepo)
        .execute({
          ...carroDisponivel.props,
        })
        .then((res: CarroDTO) => res)
    ).placa,
  };

  return insert;
};
const aluguelSut = async () => {
  const { clienteRepo, carroRepo } = repositories();
  const insert = await makePreSuts();

  const aluguel = await new AlugarCarroUseCase(clienteRepo, carroRepo).execute({
    ...insert,
  });

  return aluguel;
};
const reservaSut = async () => {
  const { clienteRepo, carroRepo } = repositories();
  const insert = await makePreSuts();
  const reserva = await new ReservaDeCarroUseCase(
    carroRepo,
    clienteRepo
  ).execute({ ...insert });

  return reserva;
};

const devolucaoSut = async () => {
  const { clienteRepo, carroRepo } = repositories();
  const aluguel = await aluguelSut().then(
    (res: { carro: CarroDTO; cliente: ClienteDTO }) => {
      const response = {
        cnh: res.cliente.cnh,
        placaCarro: res.carro.placa,
      };
      return response;
    }
  );
  const devolucao = await new DevolucaoVeiculoUseCase(
    carroRepo,
    clienteRepo
  ).execute({ ...aluguel });

  return devolucao;
};

describe("arquivar registros de aluguel, reserva e devolução de carro", () => {
  it("deve registrar o momento que um cliente alugar o carro", async () => {
    const { historicoRepo } = repositories();
    const aluguel = await aluguelSut().then(
      (res: { carro: CarroDTO; cliente: ClienteDTO }) => res
    );
    const response = await historicoRepo.arquivarRegistro(
      aluguel.carro,
      aluguel.cliente
    );
    expect(response).toHaveProperty(
      "carroPlaca",
      aluguel.carro.placa && aluguel.cliente.carroPlaca
    );
    expect(response).toHaveProperty("clienteCnh", aluguel.cliente.cnh);
    expect(response).toHaveProperty("dataDevolucao", null);
  });
  it("deve registrar o momento que um cliente reservar o carro", async () => {
    const { historicoRepo } = repositories();
    const reserva = await reservaSut().then(
      (res: { car: CarroDTO; client: ClienteDTO }) => res
    );
    const response = await historicoRepo.arquivarRegistro(
      reserva.car,
      reserva.client
    );
    expect(response).toHaveProperty("carroPlaca", reserva.car.placa);
    expect(response).toHaveProperty("carroPlaca", reserva.client.carroPlaca);
    expect(response).toHaveProperty("dataDevolucao", null);
  });
  it("deve registrar o momento que um cliente devolver o carro", async () => {
    const { historicoRepo } = repositories();
    const devolucao = await devolucaoSut().then(
      (res: { carroLivre: CarroDTO; cliente: ClienteDTO }) => res
    );
    const response = await historicoRepo.arquivarRegistro(
      devolucao.carroLivre,
      devolucao.cliente
    );
    expect(response).toHaveProperty("carroPlaca", devolucao.carroLivre.placa);
    expect(response).not.toHaveProperty("dataDevolucao", null);
  });
});
