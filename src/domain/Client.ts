import { Entity } from "./core/Entity";

export type ClientDTO = {
  nome: string;
  cpf: string;
  cnh: string;
  dataNascimento: string;
  endereco: string;
  telefone: string;
  email: string;
  cartao: string;
  senhaAcesso: string;
  placa: string;
};

export class Client extends Entity<ClientDTO> {
  constructor(props: ClientDTO, _id?: string) {
    super(props, _id);
    this.props.placa = "LIVRE";
  }

  static create(props: ClientDTO, _id?: string) {
    return new Client(props, _id);
  }
}
