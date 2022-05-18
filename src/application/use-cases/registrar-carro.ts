import { Carro, CarroDTO } from "../../domain/Carro";
import { ICarRepository } from "../repository/CarroRepositoryInterface";

type RegisterCarUseCaseDTO = {
  modelo: string;
  marca: string;
  placa: string;
  status: string;
  cor: string;
};

export class RegisterCarUseCase {
  constructor(private readonly carRepo: ICarRepository) {}

  async execute(props: RegisterCarUseCaseDTO) {
    const car = Carro.create({ ...props });

    const response = await this.carRepo
      .registrar(car)
      .then((res: CarroDTO) => {
        return res;
      })
      .catch((err) => {
        return new Error(err);
      });

    return response;
  }
}
