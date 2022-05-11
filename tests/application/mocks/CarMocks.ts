import { Car, CarroStatus } from "../../../src/domain/Car";

export const mockCarroDisponivel = (): Car =>
  Car.create({
    placa: "ABC123",
    marca: "Fiat",
    modelo: "Uno",
    cor: "prata",
    status: CarroStatus.disponivel,
  });

export const mockCarroReservado = (): Car =>
  Car.create({
    placa: "ABC123",
    marca: "Fiat",
    modelo: "Uno",
    cor: "prata",
    status: CarroStatus.reservado,
  });

export const mockCarroIndisponivel = (): Car =>
  Car.create({
    placa: "ABC123",
    marca: "Fiat",
    modelo: "Uno",
    cor: "prata",
    status: CarroStatus.indisponivel,
  });
