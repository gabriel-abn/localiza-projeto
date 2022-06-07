import { Entity } from "./core/Entity";

export type ClienteDTO = {
  nome: string;
  cnh: string;
  telefone: string;
  email: string;
  senhaAcesso: string;
  isAdmin: boolean
};

export class Cliente extends Entity<ClienteDTO> {
  constructor(props: ClienteDTO, _id?: string) {
    super(props, _id);
  }

  static create(props: ClienteDTO, _id?: string) {
    return new Cliente(props, _id);
  }
}
