import { RegisterCarUseCase } from "../../../src/application/use-cases/register-car-use-case";
import { Car, CarroStatus, CarroDTO } from "../../../src/domain/Car";
import { InMemoryCarRepository } from "../../../src/infra/repositories/in-memory/CarRepo";
import { PrismaCarRepository } from "../../../src/infra/repositories/prisma/CarRepo";
import { prismaClient } from "../../../src/infra/repositories/prisma/prismaClient";
import {
  mockCarroDisponivel,
  mockCarroIndisponivel,
} from "../../domain/mocks/CarMocks";

const prisma = prismaClient();

describe("Registrar carro no banco de dados", () => {
  beforeAll(async () => {
    await prismaClient().carro.deleteMany({});
  });
  it("deve registrar carro e receber os dados do carro registrado", async () => {
    const carro = mockCarroDisponivel();
    const prismaCarRepo = new PrismaCarRepository();
    const sut = new RegisterCarUseCase(prismaCarRepo);

    const response = await sut
      .execute({ ...carro.props })
      .then((res: CarroDTO) => res);

    expect(response).toStrictEqual(carro.props);
    expect(response).toHaveProperty("status", CarroStatus.disponivel);
  });
});
