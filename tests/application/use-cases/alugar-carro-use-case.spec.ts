import { AlugarCarroUseCase } from "../../../src/application/use-cases/alugar-carro-use-case";
import { Car, CarroStatus } from "../../../src/domain/Car";
import { Client } from "../../../src/domain/Client";
import { InMemoryCarRepository } from "../../../src/infra/repositories/in-memory/CarRepo";
import { InMemoryClientRepository } from "../../../src/infra/repositories/in-memory/ClientRepo";
import {
  mockCarroDisponivel,
  mockCarroIndisponivel,
} from "../../domain/mocks/CarMocks";
import { mockCliente } from "../../domain/mocks/ClientMock";

describe("Aluguel de carros", () => {
  it("deve alterar o status do carro, e a placa deve constar no registro do cliente", async () => {
    const userMock = mockCliente();

    const carroMock = mockCarroDisponivel();

    const carroRepo = new InMemoryCarRepository();
    const clientRepo = new InMemoryClientRepository();

    const aluguel = {
      cnh: await clientRepo.registrar(userMock).then((res) => {
        return res.props.cnh;
      }),
      placaCarro: await carroRepo.registrar(carroMock).then((res) => {
        return res.props.placa;
      }),
    };

    const sut = new AlugarCarroUseCase(clientRepo, carroRepo);

    const response = await sut
      .execute({ ...aluguel })
      .then((res: { cliente: Client; carro: Car }) => res)
      .catch((err: Error) => err);

    expect(response).toHaveProperty(
      "cliente.props.placaCarro",
      aluguel.placaCarro
    );
    expect(response).toHaveProperty(
      "carro.props.status",
      CarroStatus.indisponivel
    );
  });
  it("não deveria alugar e reservar carro inexistente", async () => {
    const userMock = mockCliente();

    const carroRepo = new InMemoryCarRepository();
    const repo = new InMemoryClientRepository();

    const aluguel = {
      cnh: await repo.registrar(userMock).then((res) => {
        return res.props.cnh;
      }),
      placaCarro: "ABC123",
    };

    const sut = new AlugarCarroUseCase(repo, carroRepo);

    const response = await sut
      .execute({ ...aluguel })
      .then((res: { cliente: Client; carro: Car }) => res)
      .catch((err: Error) => err);

    expect(response).toBeInstanceOf(Error);
  });
  it("não pode alugar um carro que esteja com o status INDISPONÍVEL", async () => {
    const carroMock = mockCarroIndisponivel();
    const userMock = mockCliente();

    const repos = {
      carroRepo: new InMemoryCarRepository(),
      clientRepo: new InMemoryClientRepository(),
    };

    const aluguel = {
      cnh: await repos.clientRepo.registrar(userMock).then((res) => {
        return res.props.cnh;
      }),
      placaCarro: await repos.carroRepo.registrar(carroMock).then((res) => {
        return res.props.placa;
      }),
    };

    const sut = new AlugarCarroUseCase(repos.clientRepo, repos.carroRepo);

    const response = await sut
      .execute({ ...aluguel })
      .then((res: { cliente: Client; carro: Car }) => res)
      .catch((err: Error) => err);

    expect(response).toBeInstanceOf(Error);
  });
});
