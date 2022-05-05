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

    const carroRepo = new InMemoryCarRepository();

    const repo = new InMemoryClientRepository();
    const sut = new RegisterClientUseCase(repo, carroRepo);

    const result = await sut.execute(userMock.props).then((res) => {
      return res;
    });

    expect(result).toBeInstanceOf(Client);
    expect(result).not.toHaveProperty("props.placaCarro");
  });
  it("should register client with existent 'placa'", async () => {
    const userMock = Client.create({
      nome: "Teste cliente",
      placaCarro: "ABC123",
      rg: "1234567",
    });

    const carroMock = Car.create({
      placa: "ABC123",
      marca: "Fiat",
      modelo: "Uno",
    });

    const carroRepo = new InMemoryCarRepository();
    const resultCarro = await carroRepo.registrar(carroMock);

    const repo = new InMemoryClientRepository();

    const sut = new RegisterClientUseCase(repo, carroRepo);
    const response = await sut.execute(userMock.props).then((res) => {
      return res;
    });

    expect(response).toBeInstanceOf(Client);
    expect(response).toHaveProperty(
      "props.placaCarro",
      resultCarro.props.placa
    );
  });
  it("should not register client with wrong 'placa'", async () => {
    const userMock = Client.create({
      nome: "Teste cliente",
      placaCarro: "ABC123",
      rg: "1234567",
    });

    const carroMock = Car.create({
      placa: "ABC000",
      marca: "Fiat",
      modelo: "Uno",
    });

    const carroRepo = new InMemoryCarRepository();
    const resultCarro = await carroRepo.registrar(carroMock);

    const repo = new InMemoryClientRepository();

    const sut = new RegisterClientUseCase(repo, carroRepo);
    const response = await sut.execute(userMock.props).then((res) => {
      return res;
    });

    expect(response).toBeInstanceOf(Client);
    expect(response).not.toHaveProperty(
      "props.placaCarro",
      resultCarro.props.placa
    );
  });
});
