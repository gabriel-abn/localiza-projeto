import { Entity } from "./core/Entity";

export enum CarroStatus {
  disponivel = "DISPONIVEL",
  reservado = "RESERVADO",
  indisponivel = "INDISPONIVEL",
}

export type CarroDTO = {
  marca: string;
  modelo: string;
  placa: string;
  status: string;
  cor: string;
};

export class Carro extends Entity<CarroDTO> {
  constructor(props: CarroDTO, _id?: string) {
    super(props, _id);
  }

  static create(props: CarroDTO, _id?: string) {
    return new Carro(props, _id);
  }
}
