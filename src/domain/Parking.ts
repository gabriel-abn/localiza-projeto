import { Entity } from "./core/Entity";

type ParkingProps = {
  vaga?: string;
  andar: string;
  numero: number;
};

export class Parking extends Entity<ParkingProps> {
  constructor(props: ParkingProps, _id?: string) {
    super(props, _id);
    this.props.vaga = this.props.andar + this.props.numero.toString();
  }

  static create(props: ParkingProps, _id?: string) {
    return new Parking(props, _id);
  }
}
