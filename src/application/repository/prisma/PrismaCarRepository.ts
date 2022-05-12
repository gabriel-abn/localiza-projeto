import { CarroDTO } from "../../../domain/abstract/Carro";
import { Car } from "../../../domain/Car";

export interface IPrismaCarRepository {
  registrar(carro: Car): Promise<CarroDTO>;
  procurarPorPlaca(placa: string): Promise<CarroDTO | Error>;
  reservaDeCarro(carro: Car): Promise<CarroDTO>;
  aluguelDeCarro(carro: Car): Promise<CarroDTO>;
  liberarCarro(carro: Car): Promise<CarroDTO>;
}
