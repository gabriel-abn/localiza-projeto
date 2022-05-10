import { ReservaDeCarroUseCase } from "../../../src/application/use-cases/reserva-de-carros";
import { Car } from "../../../src/domain/Car";
import { Client } from "../../../src/domain/Client";
import { InMemoryCarRepository } from "../../../src/infra/repositories/in-memory/CarRepo";
import { InMemoryClientRepository } from "../../../src/infra/repositories/in-memory/ClientRepo";
import { CarMockDisponivel } from "../mocks/CarMocks";
import { ClientMock } from "../mocks/ClientMock";

describe("Reserva de carro usando repositório em memória", () => {
  it("deve receber um cliente e um carro existentes e reservar o carro", async () => {
    const cliente = Client.create({ ...ClientMock });
    const car = Car.create({ ...CarMockDisponivel });

    const repos = {
      client: new InMemoryClientRepository(),
      car: new InMemoryCarRepository(),
    };

    const reserva = {
      placaCarro: await repos.car
        .procurarPorPlaca(car.props.placa)
        .then((res) => {
          return res;
        }),
      cnh: await repos.client.procurarPorCNH(cliente.props.cnh).then((res) => {
        return res;
      }),
    };
    const sut = new ReservaDeCarroUseCase(repos.car, repos.client);
  });
});
