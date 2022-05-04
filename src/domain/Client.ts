import { Entity } from "./core/Entity";

type ClientProps = {
  rg: string;
  nome: string;
  placaCarro: string;
};

export class Client extends Entity<ClientProps> {
  constructor(props: ClientProps, _id?: string) {
    super(props, _id);
  }

  static create(props: ClientProps, _id?: string) {
    return new Client(props, _id);
  }
}
