import { Car } from "../../domain/Car";
import { CarRepository } from "../repository/CarRepository";

type RegisterCarUseCaseDTO = {
  modelo: string;
  marca: string;
  placa: string;
};

export class RegisterCarUseCase {
  constructor(private readonly carRepo: CarRepository) {}

  async execute(props: RegisterCarUseCaseDTO) {
    const car = Car.create({ ...props });

    const response = await this.carRepo
      .registrar(car)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return new Error(err);
      });

    return response;
  }
}