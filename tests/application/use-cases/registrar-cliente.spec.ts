import { RegisterClientUseCase } from "../../../src/application/use-cases/registrar-cliente";
import { ClienteDTO } from "../../../src/domain/Cliente";
import { ClientRepository } from "../../../src/infra/repositories/prisma/ClienteRepository";
import { prismaClient } from "../../../src/infra/repositories/prisma/prismaClient";
import { mockCliente } from "../../domain/mocks/ClienteMock";

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
