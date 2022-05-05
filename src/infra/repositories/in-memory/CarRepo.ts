import { CarRepository } from "../../../application/repository/CarRepository";
import { Car } from "../../../domain/Car";

export class InMemoryCarRepository implements CarRepository {
  private itens: Car[] = [];

  async registrar(carro: Car): Promise<Car> {
    this.itens.push(carro);

    const res = this.itens.find((park) => {
      if (park.props.placa == carro.props.placa) {
        return park;
      }
    });

    if (!res) {
      throw new Error("Não foi possível registrar vaga.");
    }

    return res;
  }
  async procurarPorPlaca(placa: string): Promise<Car | Error> {
    const res = this.itens.find((park) => {
      if (park.props.placa == placa) {
        return park;
      }
    });

    if (!res) {
      return new Error("Carro não encontrada.");
    }

    return res;
  }
}
