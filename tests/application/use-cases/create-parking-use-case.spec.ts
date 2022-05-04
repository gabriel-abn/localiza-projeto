import { CreateParkingUseCase } from "../../../src/application/use-cases/create-parking-use-case";
import { Parking } from "../../../src/domain/Parking";
import { InMemoryParkingRepository } from "../../../src/infra/repositories/in-memory/ParkingRepo";

describe("Create parking using in memory repository", () => {
  it("should be able to register a parking with floor and number together", async () => {
    const mockParking = Parking.create({
      andar: "A",
      numero: 3,
    });

    const repository = new InMemoryParkingRepository();

    const tuc = new CreateParkingUseCase(repository);
    const response = await tuc.execute(mockParking.props).then((res) => {
      return res;
    });

    expect(response).toBeInstanceOf(Parking);
    expect(response).toHaveProperty("props.vaga", "A3");
  });
});
