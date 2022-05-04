import { Entity } from "./core/Entity";

type ClientProps = {
  name: string;
  placa: string;
};

export class Client extends Entity<ClientProps> {
  constructor(props: ClientProps, _id?: string) {
    super(props, _id);
  }

  static create(props: ClientProps, _id?: string) {
    return new Client(props, _id);
  }
}
