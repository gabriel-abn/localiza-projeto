import { Carro, CarroDTO } from "../../domain/Carro";

export interface ICarRepository {
  registrar(carro: Carro): Promise<CarroDTO>;
  procurarPorPlaca(placa: string): Promise<CarroDTO | Error>;
  aluguelDeCarro(carro: Carro): Promise<CarroDTO>;
  reservaDeCarro(carro: Carro): Promise<CarroDTO>;
  liberarCarro(carro: Carro): Promise<CarroDTO>;
}
