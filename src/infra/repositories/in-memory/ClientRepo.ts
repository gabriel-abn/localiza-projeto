import { ClientRepository } from "../../../application/repository/ClientRepository";
import { Client } from "../../../domain/Client";

export class InMemoryClientRepository implements ClientRepository {
  private itens: Client[] = [];

  async registrar(cliente: Client): Promise<Client> {
    this.itens.push(cliente);

    const res = this.itens.find((res) => {
      if (res.props.cpf == cliente.props.cpf) {
        return res;
      }
    });

    if (!res) {
      throw new Error("Não foi possível registrar cliente.");
    }

    return res;
  }
  async procurarPorCNH(cnh: string): Promise<Client | Error> {
    const response = this.itens.find((res) => {
      if (res.props.cnh == cnh) {
        return res;
      }
    });

    if (!response) {
      return new Error("Cliente não encontrado.");
    }

    return response;
  }
  async alugarCarro(cliente: Client, placaCarro: string): Promise<Client> {
    this.itens.map((obj) => {
      if (obj.props.cpf == cliente.props.cpf) {
        obj.props.carroPlaca = placaCarro;
      }
    });
    const response = this.itens.find((res) => {
      if (res.props.cpf == cliente.props.cpf) {
        return res;
      }
    });

    return response;
  }
  async reservarCarro(cliente: Client, placaCarro: string): Promise<Client> {
    this.itens.map((obj) => {
      if (obj.props.cpf == cliente.props.cpf) {
        obj.props.carroPlaca = placaCarro;
      }
    });
    const response = this.itens.find((res) => {
      if (res.props.cpf == cliente.props.cpf) {
        return res;
      }
    });

    return response;
  }
  async entregarCarro(cliente: Client): Promise<Client> {
    this.itens.map((obj) => {
      if (obj.props.cpf == cliente.props.cpf) {
        obj.props.carroPlaca = "LIVRE";
      }
    });
    const response = this.itens.find((res) => {
      if (res.props.cpf == cliente.props.cpf) {
        return res;
      }
    });

    return response;
  }
}
