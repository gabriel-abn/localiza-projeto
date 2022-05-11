import { Entity } from "./core/Entity";

type ClientProps = {
  nome: string;
  cpf: string;
  cnh: string;
  dataNascimento: string;
  endereco: string;
  telefone: string;
  email: string;
  cartao: string;
  senhaAcesso?: string;
  placaCarro?: string;
};

export class Client extends Entity<ClientProps> {
  constructor(props: ClientProps, _id?: string) {
    super(props, _id);
    this.props.placaCarro = "LIVRE";
  }

  static create(props: ClientProps, _id?: string) {
    return new Client(props, _id);
  }
}
