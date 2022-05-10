import { CarroStatus } from "../../../src/domain/Car";

export const CarMockDisponivel = {
  placa: "ABC123",
  marca: "Fiat",
  modelo: "Uno",
  cor: "prata",
  status: CarroStatus.disponivel,
};

export const CarMockReservado = {
  placa: "ABC123",
  marca: "Fiat",
  modelo: "Uno",
  cor: "prata",
  status: CarroStatus.reservado,
};

export const CarMockIndisponivel = {
  placa: "ABC123",
  marca: "Fiat",
  modelo: "Uno",
  cor: "prata",
  status: CarroStatus.indisponivel,
};
