import { AlugarCarroUseCase } from "../../../src/application/use-cases/alugar-carro-use-case";
import { RegisterClientUseCase } from "../../../src/application/use-cases/register-client-use-case";
import { Car } from "../../../src/domain/Car";
import { Client } from "../../../src/domain/Client";
import { InMemoryCarRepository } from "../../../src/infra/repositories/in-memory/CarRepo";
import { InMemoryClientRepository } from "../../../src/infra/repositories/in-memory/ClientRepo";

describe("Aluguel de carros", () => {
  it("should register car in existent client", async () => {
    const userMock = Client.create({
      nome: "Teste cliente",
      rg: "1234567",
    });

    const carroMock = Car.create({
      placa: "ABC123",
      marca: "Fiat",
      modelo: "Uno",
    });

    const carroRepo = new InMemoryCarRepository();
    const clientRepo = new InMemoryClientRepository();

    const aluguel = {
      rg: await clientRepo.registrar(userMock).then((res) => {
        return res.props.rg;
      }),
      placaCarro: await carroRepo.registrar(carroMock).then((res) => {
        return res.props.placa;
      }),
    };

    const sut = new AlugarCarroUseCase(clientRepo, carroRepo);

    const response = await sut.execute(aluguel).then((res) => {
      return res;
    });

    expect(response).toBeInstanceOf(Client);
    expect(response).toHaveProperty("props.placaCarro", aluguel.placaCarro);
  });
  it("should not register unexistent car in client", async () => {
    const userMock = Client.create({
      nome: "Teste cliente",
      rg: "1234567",
    });

    const carroRepo = new InMemoryCarRepository();
    const repo = new InMemoryClientRepository();

    const aluguel = {
      rg: await repo.registrar(userMock).then((res) => {
        return res.props.rg;
      }),
      placaCarro: "ABC123",
    };

    const sut = new AlugarCarroUseCase(repo, carroRepo);

    const response = await sut.execute(aluguel).then((res) => {
      return res;
    });

    expect(response).not.toBeInstanceOf(Client);
    expect(response).not.toHaveProperty("props.placaCarro");
  });
});
