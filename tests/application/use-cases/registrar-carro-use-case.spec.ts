import { RegisterCarUseCase } from "../../../src/application/use-cases/register-car-use-case";
import { Car, CarroStatus } from "../../../src/domain/Car";
import { InMemoryCarRepository } from "../../../src/infra/repositories/in-memory/CarRepo";

describe("Registrar carro no repositório local", () => {
  it("should register a car with status 'DISPONÍVEL'", async () => {
    const carro = Car.create({
      cor: "vermelho",
      marca: "fiat",
      modelo: "Unin",
      placa: "ABC123",
      status: CarroStatus.disponivel,
    });

    const repo = new InMemoryCarRepository();
    const sut = new RegisterCarUseCase(repo);

    const response = await sut.execute(carro.props).then((res) => {
      return res;
    });

    expect(response).toBeInstanceOf(Car);
    expect(response).toHaveProperty("props.status", CarroStatus.disponivel);
  });
});
