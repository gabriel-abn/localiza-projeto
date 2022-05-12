import { RegisterCarUseCase } from "../../../src/application/use-cases/register-car-use-case";
import { CarroDTO } from "../../../src/domain/abstract/Carro";
import { Car, CarroStatus } from "../../../src/domain/Car";
import { InMemoryCarRepository } from "../../../src/infra/repositories/in-memory/CarRepo";
import { PrismaCarRepository } from "../../../src/infra/repositories/prisma/CarRepo";
import { prismaClient } from "../../../src/infra/repositories/prisma/prismaClient";
import {
  mockCarroDisponivel,
  mockCarroIndisponivel,
} from "../../domain/mocks/CarMocks";

const prisma = prismaClient();

describe("Registrar carro no repositório local", () => {
  it("deve cadastrar carro com status 'DISPONÍVEL'", async () => {
    const carro = mockCarroDisponivel();

    const repo = new InMemoryCarRepository();
    const sut = new RegisterCarUseCase(repo);

    const response = await sut.execute(carro.props).then((res) => {
      return res;
    });

    expect(response).toBeInstanceOf(Car);
    expect(response).toHaveProperty("props.status", CarroStatus.disponivel);
  });
});

describe("Registrar carro no banco de dados", () => {
  beforeAll(async () => {
    await prisma.$executeRaw`DELETE FROM deslocadb.Carro`;
  });
  it("deve registrar carro e receber os dados do carro registrado", async () => {
    const carro = mockCarroDisponivel();
    const prismaCarRepo = new PrismaCarRepository();
    const response = await prismaCarRepo
      .registrar(carro)
      .then((res: CarroDTO) => res);

    expect(response).toStrictEqual(carro.props);
    expect(response).toHaveProperty("status", CarroStatus.disponivel);
  });
});
