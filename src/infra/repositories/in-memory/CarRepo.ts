import { CarRepository } from "../../../application/repository/CarRepository";
import { Car, CarroStatus } from "../../../domain/Car";

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
      throw new Error("Não foi possível registrar carro.");
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
      return new Error("Carro não encontrado.");
    }

    return res;
  }
  async aluguelDeCarro(carro: Car): Promise<Car> {
    const res = this.itens.map((car) => {
      if (car.props.placa == carro.props.placa) {
        car.props.status = CarroStatus.indisponivel;
      }
      return car;
    });

    return res.find((car) => {
      if (car.props.placa == carro.props.placa) {
        return car;
      }
    });
  }

  async reservaDeCarro(carro: Car): Promise<Car> {
    const res = this.itens.map((car) => {
      if (car.props.placa == carro.props.placa) {
        car.props.status = CarroStatus.reservado;
      }
      return car;
    });

    return res.find((car) => {
      if (car.props.placa == carro.props.placa) {
        return car;
      }
    });
  }
  async liberarCarro(carro: Car): Promise<Car> {
    const res = this.itens.map((car) => {
      if (car.props.placa == carro.props.placa) {
        car.props.status = CarroStatus.disponivel;
      }
      return car;
    });

    return res.find((car) => {
      if (car.props.placa == carro.props.placa) {
        return car;
      }
    });
  }
}
