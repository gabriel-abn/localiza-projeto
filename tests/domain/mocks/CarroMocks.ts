import { Carro, CarroStatus } from "../../../src/domain/Carro";
import { faker } from "@faker-js/faker";

export const mockCarroDisponivel = (): Carro =>
  Carro.create({
    placa: faker.vehicle.vrm(),
    marca: faker.vehicle.manufacturer(),
    modelo: faker.vehicle.model(),
    cor: faker.vehicle.color(),
    status: CarroStatus.disponivel,
  });

export const mockCarroReservado = (): Carro =>
  Carro.create({
    placa: faker.vehicle.vrm(),
    marca: faker.vehicle.manufacturer(),
    modelo: faker.vehicle.model(),
    cor: faker.vehicle.color(),
    status: CarroStatus.reservado,
  });

export const mockCarroIndisponivel = (): Carro =>
  Carro.create({
    placa: faker.vehicle.vrm(),
    marca: faker.vehicle.manufacturer(),
    modelo: faker.vehicle.model(),
    cor: faker.vehicle.color(),
    status: CarroStatus.indisponivel,
  });
