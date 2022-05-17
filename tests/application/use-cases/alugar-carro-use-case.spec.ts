import { AlugarCarroUseCase } from "../../../src/application/use-cases/alugar-carro-use-case";
import { Car, CarroStatus } from "../../../src/domain/Car";
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
  const cliente = mockCliente();

  return { carroIndisponivel, carroDisponivel, cliente };
};

const makeSut = async (mockCar: Car) => {
  const { cliente } = mocks();

  const carroRepo = new CarRepository();
  const clienteRepo = new ClientRepository();

  const request = {
    cnh: (await clienteRepo.registrar(cliente)).cnh,
    placaCarro: (await carroRepo.registrar(mockCar)).placa,
  };

  const sut = new AlugarCarroUseCase(clienteRepo, carroRepo);

  return {
    carroRepo,
    clienteRepo,
    request,
    sut,
  };
};

describe("Aluguel de carros em banco de dados", () => {
  beforeAll(async () => {
    await prismaClient.carro.deleteMany({});
    await prismaClient.cliente.deleteMany({});
  });
  it("deve acessar o banco de dados e alterar o status do carro e o responsável do carro", async () => {
    const { carroDisponivel } = mocks();
    const { sut, request } = await makeSut(carroDisponivel);
    const response = await sut.execute({ ...request });

    expect(response).toHaveProperty("cliente.carroPlaca", request.placaCarro);
    expect(response).toHaveProperty("carro.status", CarroStatus.indisponivel);
  });
});
