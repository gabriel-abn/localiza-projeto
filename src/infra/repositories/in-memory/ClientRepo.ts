import { ClientRepository } from "../../../application/repository/ClientRepository";
import { Client } from "../../../domain/Client";

export class InMemoryClientRepository implements ClientRepository {
  private itens: Client[] = [];

  async registrar(cliente: Client): Promise<Client> {
    this.itens.push(cliente);

    const res = this.itens.find((res) => {
      if (res.props.rg == cliente.props.rg) {
        return res;
      }
    });

    if (!res) {
      throw new Error("Não foi possível registrar cliente.");
    }

    return res;
  }
  async procurarPorRG(rg: string): Promise<Client | Error> {
    const response = this.itens.find((res) => {
      if (res.props.rg == rg) {
        return res;
      }
    });

    if (!response) {
      return new Error("Vaga não encontrada.");
    }

    return response;
  }
  async aluguelDeCarro(cliente: Client, placaCarro: string): Promise<Client> {
    this.itens.map((obj) => {
      if (obj.props.rg == cliente.props.rg) {
        obj.props.placaCarro = placaCarro;
      }
    });
    const response = this.itens.find((res) => {
      if (res.props.rg == cliente.props.rg) {
        return res;
      }
    });

    return response;
  }
}
