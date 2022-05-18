import { RegisterCarUseCase } from "../../../src/application/use-cases/register-car-use-case";
import { Car, CarroStatus, CarroDTO } from "../../../src/domain/Car";
import { CarRepository } from "../../../src/infra/repositories/prisma/CarRepository";
import { prismaClient } from "../../../src/infra/repositories/prisma/prismaClient";
import {
  mockCarroDisponivel,
  mockCarroIndisponivel,
} from "../../domain/mocks/CarMocks";

describe("Registrar carro no banco de dados", () => {
  it("deve registrar carro e receber os dados do carro registrado", async () => {
    const carro = mockCarroDisponivel();
    const prismaCarRepo = new CarRepository();
    const sut = new RegisterCarUseCase(prismaCarRepo);

    const response = await sut
      .execute({ ...carro.props })
      .then((res: CarroDTO) => res);

    expect(response).toStrictEqual<CarroDTO>(carro.props);
    expect(response).toHaveProperty("status", CarroStatus.disponivel);
  });
});
