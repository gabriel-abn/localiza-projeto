import { AlugarCarroUseCase } from "../../../src/application/use-cases/alugar-carro-use-case";
import { Car, CarroStatus } from "../../../src/domain/Car";
import { Client } from "../../../src/domain/Client";
import { InMemoryCarRepository } from "../../../src/infra/repositories/in-memory/CarRepo";
import { InMemoryClientRepository } from "../../../src/infra/repositories/in-memory/ClientRepo";
import { PrismaCarRepository } from "../../../src/infra/repositories/prisma/CarRepo";
import { PrismaClientRepository } from "../../../src/infra/repositories/prisma/ClientRepo";
import { prismaClient } from "../../../src/infra/repositories/prisma/prismaClient";
import {
  mockCarroDisponivel,
  mockCarroIndisponivel,
} from "../../domain/mocks/CarMocks";
import { mockCliente } from "../../domain/mocks/ClientMock";

const makeSut = () => {
  const carroRepo = new PrismaCarRepository();
  const clienteRepo = new PrismaClientRepository();
  const sut = new AlugarCarroUseCase(clienteRepo, carroRepo);

  return {
    carroRepo,
    clienteRepo,
    sut,
  };
};

const mocks = () => {
  const carroDisponivel = mockCarroDisponivel();
  const carroIndisponivel = mockCarroIndisponivel();
  const cliente = mockCliente(carroDisponivel.props.placa);

  return { carroIndisponivel, carroDisponivel, cliente };
};

describe("Aluguel de carros em banco de dados", () => {
  beforeAll(async () => {
    await prismaClient().carro.deleteMany({});
    await prismaClient().cliente.deleteMany({});
  });
  it("deve acessar o banco de dados e alterar o status do carro e o responsável do carro", async () => {
    const { sut, carroRepo, clienteRepo } = makeSut();
    const { cliente, carroDisponivel } = mocks();
    const request = {
      cnh: cliente.props.cnh,
      placaCarro: carroDisponivel.props.placa,
    };
    await carroRepo.registrar(carroDisponivel);
    await clienteRepo.registrar(cliente);
    const response = await sut.execute({ ...request });

    expect(response).toHaveProperty("cliente.carroPlaca", request.placaCarro);
    expect(response).toHaveProperty("carro.status", CarroStatus.indisponivel);
  });
});
