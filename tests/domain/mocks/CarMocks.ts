import { Car, CarroStatus } from "../../../src/domain/Car";
import { faker } from "@faker-js/faker";

export const mockCarroDisponivel = (): Car =>
  Car.create({
    placa: faker.vehicle.vrm(),
    marca: faker.vehicle.manufacturer(),
    modelo: faker.vehicle.model(),
    cor: faker.vehicle.color(),
    status: CarroStatus.disponivel,
  });

export const mockCarroReservado = (): Car =>
  Car.create({
    placa: faker.vehicle.vrm(),
    marca: faker.vehicle.manufacturer(),
    modelo: faker.vehicle.model(),
    cor: faker.vehicle.color(),
    status: CarroStatus.reservado,
  });

export const mockCarroIndisponivel = (): Car =>
  Car.create({
    placa: faker.vehicle.vrm(),
    marca: faker.vehicle.manufacturer(),
    modelo: faker.vehicle.model(),
    cor: faker.vehicle.color(),
    status: CarroStatus.indisponivel,
  });
