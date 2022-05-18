import { AlugarCarroUseCase } from "../../../src/application/use-cases/alugar-carro";
import { DevolucaoVeiculoUseCase } from "../../../src/application/use-cases/devolucao-veiculo";
import { Carro, CarroDTO, CarroStatus } from "../../../src/domain/Carro";
import { Cliente, ClienteDTO } from "../../../src/domain/Cliente";
import { CarRepository } from "../../../src/infra/repositories/prisma/CarroRepository";
import { ClientRepository } from "../../../src/infra/repositories/prisma/ClienteRepository";
import { prismaClient } from "../../../src/infra/repositories/prisma/prismaClient";
import {
  mockCarroDisponivel,
  mockCarroIndisponivel,
} from "../../domain/mocks/CarroMocks";
import { mockCliente } from "../../domain/mocks/ClienteMock";

const mocks = () => {
  const carroDisponivel = mockCarroDisponivel();
  const carroIndisponivel = mockCarroIndisponivel();

  return { carroDisponivel, carroIndisponivel };
};

const makeSut = async (mockCar: Carro) => {
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
  it("O carro deve alterar de estado assim que devolvido", async () => {
    const { carroDisponivel } = mocks();
    const { requests, sut } = await makeSut(carroDisponivel);

    const response = await sut.execute({ ...requests });

    expect(response).toHaveProperty(
      "carroLivre.status",
      CarroStatus.disponivel
    );
    expect(response).toHaveProperty("cliente.carroPlaca", null);
  });
});
