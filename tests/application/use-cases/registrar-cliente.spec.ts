import { RegisterClientUseCase } from "../../../src/application/use-cases/register-client-use-case";
import { Client, ClienteDTO } from "../../../src/domain/Client";
import { InMemoryClientRepository } from "../../../src/infra/repositories/in-memory/ClientRepo";
import { PrismaCarRepository } from "../../../src/infra/repositories/prisma/CarRepo";
import { PrismaClientRepository } from "../../../src/infra/repositories/prisma/ClientRepo";
import { prismaClient } from "../../../src/infra/repositories/prisma/prismaClient";
import { mockCarroDisponivel } from "../../domain/mocks/CarMocks";
import { mockCliente } from "../../domain/mocks/ClientMock";

describe("Cadastro de cliente no banco de dados", () => {
  beforeAll(async () => {
    const preview = {
      client: await prismaClient().cliente.deleteMany({}),
    };
  });
  it("deve cadastrar um cliente no banco de dados sem carro", async () => {
    const userMock = mockCliente();
    const repo = new PrismaClientRepository();

    const sut = new RegisterClientUseCase(repo);
    const response = await sut
      .execute({ ...userMock.props })
      .then((res: ClienteDTO) => res);

    console.log(response);

    expect(response).toStrictEqual<ClienteDTO>({ ...userMock.props });
    expect(response).toHaveProperty("carroPlaca", null);
  });
});
