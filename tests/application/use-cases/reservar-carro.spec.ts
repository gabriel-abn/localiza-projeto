import { ReservaDeCarroUseCase } from "../../../src/application/use-cases/reserva-de-carros";
import { Car, CarroStatus } from "../../../src/domain/Car";
import { Client } from "../../../src/domain/Client";
import { InMemoryCarRepository } from "../../../src/infra/repositories/in-memory/CarRepo";
import { InMemoryClientRepository } from "../../../src/infra/repositories/in-memory/ClientRepo";
import { mockCarroDisponivel } from "../../domain/mocks/CarMocks";
import { mockCliente } from "../../domain/mocks/ClientMock";

describe("Reserva de carro usando repositório em memória", () => {
  it("deve receber um cliente e um carro existentes e reservar o carro", async () => {
    const cliente = mockCliente();
    const car = mockCarroDisponivel();

    const repos = {
      client: new InMemoryClientRepository(),
      car: new InMemoryCarRepository(),
    };

    const insert = {
      carro: await repos.car.registrar(car).then((res: Car) => res),
      cliente: await repos.client.registrar(cliente).then((res: Client) => res),
    };
    const procura = {
      placaCarro: await repos.car
        .procurarPorPlaca(insert.carro.props.placa)
        .then((res: Car) => res.props.placa),
      // cnh: "PLACA_CARRO",
      cnh: await repos.client
        .procurarPorCNH(insert.cliente.props.cnh)
        .then((res: Client) => res.props.cnh),
    };
    const sut = new ReservaDeCarroUseCase(repos.car, repos.client);

    const response = await sut
      .execute({ ...procura })
      .then((res: { car: Car; client: Client }) => res)
      .catch((err: Error) => err);

    expect(response).toHaveProperty("car.props.status", CarroStatus.reservado);
  });
});
