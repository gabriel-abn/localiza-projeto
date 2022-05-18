import { RegisterClientUseCase } from "../../../src/application/use-cases/register-client-use-case";
import { ClienteDTO } from "../../../src/domain/Client";
import { ClientRepository } from "../../../src/infra/repositories/prisma/ClientRepository";
import { prismaClient } from "../../../src/infra/repositories/prisma/prismaClient";
import { mockCliente } from "../../domain/mocks/ClientMock";

describe("Cadastro de cliente no banco de dados", () => {
  it("deve cadastrar um cliente no banco de dados sem carro", async () => {
    const userMock = mockCliente();
    const repo = new ClientRepository();

    const sut = new RegisterClientUseCase(repo);
    const response = await sut
      .execute({ ...userMock.props })
      .then((res: ClienteDTO) => res);

    expect(response).toStrictEqual<ClienteDTO>({ ...userMock.props });
    expect(response).toHaveProperty("carroPlaca", null);
  });
});
