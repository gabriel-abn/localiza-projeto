import { Entity } from "./core/Entity";

type CarProps = {
  marca: string;
  modelo: string;
  placa: string;
};

export class Car extends Entity<CarProps> {
  constructor(props: CarProps, _id?: string) {
    super(props, _id);
  }

  static create(props: CarProps, _id?: string) {
    return new Car(props, _id);
  }
}
