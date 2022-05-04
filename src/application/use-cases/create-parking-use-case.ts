import { Parking } from "../../domain/Parking";
import { ParkingRepository } from "../repository";

type CreateParkingUseCaseDTO = {
  vaga?: string;
  andar: string;
  numero: number;
};

export class CreateParkingUseCase {
  constructor(private readonly parkingRepo: ParkingRepository) {}

  async execute(props: CreateParkingUseCaseDTO) {
    const parking = Parking.create({ ...props });

    const result = await this.parkingRepo
      .registrar(parking)
      .then((response) => {
        return response;
      });

    return result;
  }
}
