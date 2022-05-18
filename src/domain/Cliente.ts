import { Entity } from "./core/Entity";

export type ClienteDTO = {
  nome: string;
  cpf: string;
  cnh: string;
  dataNascimento: Date;
  endereco: string;
  telefone: string;
  email: string;
  cartao: string;
  senhaAcesso: string;
  carroPlaca: string;
};

export class Cliente extends Entity<ClienteDTO> {
  constructor(props: ClienteDTO, _id?: string) {
    super(props, _id);
  }

  static create(props: ClienteDTO, _id?: string) {
    return new Cliente(props, _id);
  }
}
