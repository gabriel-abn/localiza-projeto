import { RegisterClientUseCase } from "../../../src/application/use-cases/register-client-use-case";
import { Car } from "../../../src/domain/Car";
import { Client } from "../../../src/domain/Client";
import { InMemoryCarRepository } from "../../../src/infra/repositories/in-memory/CarRepo";
import { InMemoryClientRepository } from "../../../src/infra/repositories/in-memory/ClientRepo";

describe("Register client using in memory repository", () => {
  it("should register client with no 'placa'", async () => {
    const userMock = Client.create({
      nome: "Teste cliente",
      rg: "1234567",
    });

    const repo = new InMemoryClientRepository();
    const sut = new RegisterClientUseCase(repo);

    const result = await sut.execute(userMock.props).then((res) => {
      return res;
    });

    expect(result).toBeInstanceOf(Client);
    expect(result).not.toHaveProperty("props.placaCarro");
  });
});
