import { ParkingRepository } from "../../../application/repository";
import { Parking } from "../../../domain/Parking";

export class InMemoryParkingRepository implements ParkingRepository {
  private itens: Parking[] = [];

  async registrar(parking: Parking): Promise<Parking> {
    this.itens.push(parking);

    const res = this.itens.find((park) => {
      if (park.props.vaga == parking.props.vaga) {
        return park;
      }
    });

    if (!res) {
      throw new Error("Não foi possível registrar vaga.");
    }

    return res;
  }
  async procurarPorID(id: string): Promise<Parking | Error> {
    const res = this.itens.find((park) => {
      if (park.props.vaga == id) {
        return park;
      }
    });

    if (!res) {
      return new Error("Vaga não encontrada.");
    }

    return res;
  }
}
