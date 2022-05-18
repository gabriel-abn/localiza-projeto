import { Car, CarroDTO } from "../../domain/Car";
import { ICarRepository } from "../repository/CarRepositoryInterface";

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
    const car = Car.create({ ...props });

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
