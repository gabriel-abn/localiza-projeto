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

export class Car extends Entity<CarroDTO> {
  constructor(props: CarroDTO, _id?: string) {
    super(props, _id);
  }

  static create(props: CarroDTO, _id?: string) {
    return new Car(props, _id);
  }
}
