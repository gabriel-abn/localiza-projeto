import { Car, CarroDTO } from "../../domain/Car";
import { CarRepository } from "../repository/CarRepository";

type RegisterCarUseCaseDTO = {
  modelo: string;
  marca: string;
  placa: string;
  status: string;
  cor: string;
};

export class RegisterCarUseCase {
  constructor(private readonly carRepo: CarRepository) {}

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
