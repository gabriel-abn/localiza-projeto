import { DevolucaoVeiculoUseCase } from "../../../src/application/use-cases/devolucao-veiculo";
import { Car, CarroStatus } from "../../../src/domain/Car";
import { Client } from "../../../src/domain/Client";
import { InMemoryCarRepository } from "../../../src/infra/repositories/in-memory/CarRepo";
import { InMemoryClientRepository } from "../../../src/infra/repositories/in-memory/ClientRepo";
import { mockCarroIndisponivel } from "../../domain/mocks/CarMocks";
import { mockCliente } from "../../domain/mocks/ClientMock";

describe("Devolução de carros", () => {
  it("O carro deve alterar de estado assim que devolvido", async () => {
    const carro = mockCarroIndisponivel();
    const cliente = mockCliente(carro.props.placa);

    const repository = {
      carro: new InMemoryCarRepository(),
      cliente: new InMemoryClientRepository(),
    };

    const aluguel = {
      placa: await repository.carro
        .registrar(carro)
        .then((res: Car) => res.props.placa),
      cnh: await repository.cliente
        .registrar(cliente)
        .then((res: Client) => res.props.cnh),
    };

    const sut = new DevolucaoVeiculoUseCase(
      repository.carro,
      repository.cliente
    );

    const response = await sut
      .execute({ ...aluguel })
      .then((res: { carroLivre: Car; cliente: Client }) => res);

    expect(response).toHaveProperty(
      "carroLivre.props.status",
      CarroStatus.disponivel
    );
    expect(response).toHaveProperty("cliente.props.placaCarro", "LIVRE");
  });
});
