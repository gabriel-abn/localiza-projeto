import { Entity } from "./core/Entity";

export enum CarroStatus {
  disponivel = "DISPONIVEL",
  reservado = "RESERVADO",
  indisponivel = "INDISPONIVEL",
}

type CarProps = {
  marca: string;
  modelo: string;
  placa: string;
  status: string;
  cor: string;
};

export class Car extends Entity<CarProps> {
  constructor(props: CarProps, _id?: string) {
    super(props, _id);
  }

  static create(props: CarProps, _id?: string) {
    return new Car(props, _id);
  }
}
