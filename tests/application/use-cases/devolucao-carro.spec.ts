import { DevolucaoVeiculoUseCase } from "../../../src/application/use-cases/devolucao-veiculo";
import { Car, CarroStatus, CarroDTO } from "../../../src/domain/Car";
import { Client, ClienteDTO } from "../../../src/domain/Client";
import { InMemoryCarRepository } from "../../../src/infra/repositories/in-memory/CarRepo";
import { InMemoryClientRepository } from "../../../src/infra/repositories/in-memory/ClientRepo";
import { PrismaCarRepository } from "../../../src/infra/repositories/prisma/CarRepo";
import { PrismaClientRepository } from "../../../src/infra/repositories/prisma/ClientRepo";
import { mockCarroIndisponivel } from "../../domain/mocks/CarMocks";
import { mockCliente } from "../../domain/mocks/ClientMock";

describe("Devolução de carros", () => {
  it("O carro deve alterar de estado assim que devolvido", async () => {
    const carro = mockCarroIndisponivel();
    const cliente = mockCliente(carro.props.placa);

    const repository = {
      carro: new PrismaCarRepository(),
      cliente: new PrismaClientRepository(),
    };

    const aluguel = {
      placa: await repository.carro
        .registrar(carro)
        .then((res: CarroDTO) => res),
      cnh: await repository.cliente
        .registrar(cliente)
        .then((res: ClienteDTO) => res),
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
