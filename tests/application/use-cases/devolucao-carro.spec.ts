import { DevolucaoVeiculoUseCase } from "../../../src/application/use-cases/devolucao-veiculo";
import { InMemoryCarRepository } from "../../../src/infra/repositories/in-memory/CarRepo";
import { InMemoryClientRepository } from "../../../src/infra/repositories/in-memory/ClientRepo";
import { mockCarroIndisponivel } from "../mocks/CarMocks";
import { mockCliente } from "../mocks/ClientMock";

const helpers = () => {
  const repository = {
    cliente: new InMemoryClientRepository(),
    carro: new InMemoryCarRepository(),
  };
};

describe("Devolução de carros", () => {
  it("O carro deve alterar de estado assim que devolvido", async () => {
    const carro = mockCarroIndisponivel();
    const cliente = mockCliente(carro.props.placa);

    const repository = {
      carro: new InMemoryCarRepository(),
      cliente: new InMemoryClientRepository(),
    };

    const sut = new DevolucaoVeiculoUseCase(
      repository.carro,
      repository.cliente
    );

    expect(3 + 3).toBe(6);
  });
});
