import { RegisterClientUseCase } from "../../../src/application/use-cases/register-client-use-case";
import { Car } from "../../../src/domain/Car";
import { Client } from "../../../src/domain/Client";
import { InMemoryCarRepository } from "../../../src/infra/repositories/in-memory/CarRepo";
import { InMemoryClientRepository } from "../../../src/infra/repositories/in-memory/ClientRepo";
import { mockCliente } from "../../domain/mocks/ClientMock";

describe("Cadastro de clientes", () => {
  it("deve cadastrar um cliente sem o atributo 'placa'", async () => {
    const userMock = mockCliente();

    const repo = new InMemoryClientRepository();
    const sut = new RegisterClientUseCase(repo);

    const result = await sut.execute(userMock.props).then((res) => {
      return res;
    });

    expect(result).toBeInstanceOf(Client);
    expect(result).not.toHaveProperty("props.placaCarro");
  });
});
