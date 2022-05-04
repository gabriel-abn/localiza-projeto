import { Car } from "../../domain/Car";

export interface CarRepository {
  registrar(carro: Car): Promise<Car>;
  procurarPorPlaca(placa: string): Promise<Car | Error>;
}
