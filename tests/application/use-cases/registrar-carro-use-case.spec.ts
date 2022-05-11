import { RegisterCarUseCase } from "../../../src/application/use-cases/register-car-use-case";
import { Car, CarroStatus } from "../../../src/domain/Car";
import { InMemoryCarRepository } from "../../../src/infra/repositories/in-memory/CarRepo";
import { mockCarroDisponivel } from "../../domain/mocks/CarMocks";

describe("Registrar carro no repositório local", () => {
  it("deve cadastrar carro com status 'DISPONÍVEL'", async () => {
    const carro = mockCarroDisponivel();

    const repo = new InMemoryCarRepository();
    const sut = new RegisterCarUseCase(repo);

    const response = await sut.execute(carro.props).then((res) => {
      return res;
    });

    expect(response).toBeInstanceOf(Car);
    expect(response).toHaveProperty("props.status", CarroStatus.disponivel);
  });
});
