import { AlugarCarroUseCase } from "../../../src/application/use-cases/alugar-carro-use-case";
import { DevolucaoVeiculoUseCase } from "../../../src/application/use-cases/devolucao-veiculo";
import { Car, CarroDTO, CarroStatus } from "../../../src/domain/Car";
import { Client, ClienteDTO } from "../../../src/domain/Client";
import { CarRepository } from "../../../src/infra/repositories/prisma/CarRepo";
import { ClientRepository } from "../../../src/infra/repositories/prisma/ClientRepo";
import { prismaClient } from "../../../src/infra/repositories/prisma/prismaClient";
import {
  mockCarroDisponivel,
  mockCarroIndisponivel,
} from "../../domain/mocks/CarMocks";
import { mockCliente } from "../../domain/mocks/ClientMock";

const mocks = () => {
  const carroDisponivel = mockCarroDisponivel();
  const carroIndisponivel = mockCarroIndisponivel();

  return { carroDisponivel, carroIndisponivel };
};

const makeSut = async (mockCar: Car) => {
  const repositories = {
    carro: new CarRepository(),
    cliente: new ClientRepository(),
  };
  const requests = {
    cnh: (await repositories.cliente.registrar(mockCliente())).cnh,
    placaCarro: (await repositories.carro.registrar(mockCar)).placa,
  };
  const aluguel = await new AlugarCarroUseCase(
    repositories.cliente,
    repositories.carro
  ).execute({ ...requests });

  const sut = new DevolucaoVeiculoUseCase(
    repositories.carro,
    repositories.cliente
  );
  return { repositories, requests, aluguel, sut };
};

describe("Devolução de carros", () => {
  beforeEach(async () => {
    await prismaClient.carro.deleteMany({});
    await prismaClient.cliente.deleteMany({});
  });
  it("O carro deve alterar de estado assim que devolvido", async () => {
    const { carroDisponivel } = mocks();
    const { requests, sut } = await makeSut(carroDisponivel);

    const response = await sut
      .execute({ ...requests })
      .then((res: { carroLivre: CarroDTO; cliente: ClienteDTO }) => res);

    expect(response).toHaveProperty(
      "carroLivre.props.status",
      CarroStatus.disponivel
    );
    expect(response).toHaveProperty("cliente.props.carroPlaca", null);
  });
});
