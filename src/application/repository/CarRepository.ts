import { Car, CarroDTO } from "../../domain/Car";

export interface CarRepository {
  registrar(carro: Car): Promise<CarroDTO>;
  procurarPorPlaca(placa: string): Promise<CarroDTO | Error>;
  aluguelDeCarro(carro: Car): Promise<CarroDTO>;
  reservaDeCarro(carro: Car): Promise<CarroDTO>;
  liberarCarro(carro: Car): Promise<CarroDTO>;
}
