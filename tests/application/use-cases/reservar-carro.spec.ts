import { ReservaDeCarroUseCase } from "../../../src/application/use-cases/reserva-de-carros";
import { Car, CarroDTO, CarroStatus } from "../../../src/domain/Car";
import { ClienteDTO } from "../../../src/domain/Client";
import { CarRepository } from "../../../src/infra/repositories/prisma/CarRepo";
import { ClientRepository } from "../../../src/infra/repositories/prisma/ClientRepo";
import { prismaClient } from "../../../src/infra/repositories/prisma/prismaClient";
import {
  mockCarroDisponivel,
  mockCarroIndisponivel,
} from "../../domain/mocks/CarMocks";
import { mockCliente } from "../../domain/mocks/ClientMock";

const mocks = () => {
  const cliente = mockCliente();
  const carDisponivel = mockCarroDisponivel();
  const carIndisponivel = mockCarroIndisponivel();

  return { cliente, carDisponivel, carIndisponivel };
};
const makeSut = async (mockCar: Car) => {
  const { cliente } = mocks();

  const repos = {
    client: new ClientRepository(),
    car: new CarRepository(),
  };
  const insert = {
    placaCarro: (await repos.car.registrar(mockCar)).placa,
    cnh: (await repos.client.registrar(cliente)).cnh,
  };
  const procura = {
    placaCarro: await repos.car
      .procurarPorPlaca(insert.placaCarro)
      .then((res: CarroDTO) => res.placa),
    cnh: await repos.client
      .procurarPorCNH(insert.cnh)
      .then((res: ClienteDTO) => res.cnh),
  };

  const sut = new ReservaDeCarroUseCase(repos.car, repos.client);

  return { procura, sut };
};

describe("Reserva de carro", () => {
  beforeEach(async () => {
    await prismaClient.carro.deleteMany({});
    await prismaClient.cliente.deleteMany({});
  });
  it("deve receber um cliente e um carro existentes e reservar o carro", async () => {
    const { carDisponivel } = mocks();
    const { sut, procura } = await makeSut(carDisponivel);
    const response = await sut.execute({ ...procura });

    expect(response).toHaveProperty("car.status", CarroStatus.reservado);
    expect(response).toHaveProperty("client.carroPlaca", "car.placa");
  });
  it("não pode deixar reservar um carro sem o status disponivel", async () => {
    const { carIndisponivel } = mocks();
    const { sut, procura } = await makeSut(carIndisponivel);
    const response = await sut.execute(procura);
    expect(response).toHaveProperty("car", Error);
  });
});
