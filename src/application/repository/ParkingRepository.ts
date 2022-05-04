import { Parking } from "../../domain/Parking";

export interface ParkingRepository {
  registrar(parking: Parking): Promise<Parking>;
  procurarPorID(id: string): Promise<Parking | Error>;
}
