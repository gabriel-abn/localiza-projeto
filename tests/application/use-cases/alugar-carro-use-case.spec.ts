import { AlugarCarroUseCase } from "../../../src/application/use-cases/alugar-carro-use-case";
import { RegisterClientUseCase } from "../../../src/application/use-cases/register-client-use-case";
import { Car, CarroStatus } from "../../../src/domain/Car";
import { Client } from "../../../src/domain/Client";
import { InMemoryCarRepository } from "../../../src/infra/repositories/in-memory/CarRepo";
import { InMemoryClientRepository } from "../../../src/infra/repositories/in-memory/ClientRepo";

describe("Aluguel de carros", () => {
  it("should register car in existent client", async () => {
    const userMock = Client.create({
      nome: "Teste cliente",
      cartao: "12345678",
      cnh: "CNH00999",
      dataNascimento: "20/09/2000",
      email: "gabriel.ab.nascimento",
      endereco: "Rua Francisco Teles, 41",
      telefone: "983989350",
      cpf: "1234567",
    });

    const carroMock = Car.create({
      placa: "ABC123",
      marca: "Fiat",
      modelo: "Uno",
      cor: "prata",
      status: CarroStatus.disponivel,
    });

    const carroRepo = new InMemoryCarRepository();
    const clientRepo = new InMemoryClientRepository();

    const aluguel = {
      rg: await clientRepo.registrar(userMock).then((res) => {
        return res.props.cpf;
      }),
      placaCarro: await carroRepo.registrar(carroMock).then((res) => {
        return res.props.placa;
      }),
    };

    const sut = new AlugarCarroUseCase(clientRepo, carroRepo);

    const response = await sut.execute(aluguel).then((res) => {
      return res;
    });

    expect(response).toBeInstanceOf(Client);
    expect(response).toHaveProperty("props.placaCarro", aluguel.placaCarro);
  });
  it("should not register unexistent car in client", async () => {
    const userMock = Client.create({
      nome: "Teste cliente",
      cartao: "12345678",
      cnh: "CNH00999",
      dataNascimento: "20/09/2000",
      email: "gabriel.ab.nascimento",
      endereco: "Rua Francisco Teles, 41",
      telefone: "983989350",
      cpf: "1234567",
    });

    const carroRepo = new InMemoryCarRepository();
    const repo = new InMemoryClientRepository();

    const aluguel = {
      rg: await repo.registrar(userMock).then((res) => {
        return res.props.cpf;
      }),
      placaCarro: "ABC123",
    };

    const sut = new AlugarCarroUseCase(repo, carroRepo);

    const response = await sut.execute(aluguel).then((res) => {
      return res;
    });

    expect(response).not.toBeInstanceOf(Client);
    expect(response).not.toHaveProperty("props.placaCarro");
  });
  it("não pode alugar um carro que esteja com o status INDISPONÍVEL", async () => {
    const carroMock = Car.create({
      placa: "ABC123",
      marca: "Fiat",
      modelo: "Uno",
      cor: "prata",
      status: CarroStatus.indisponivel,
    });

    const userMock = Client.create({
      nome: "Teste cliente",
      cartao: "12345678",
      cnh: "CNH00999",
      dataNascimento: "20/09/2000",
      email: "gabriel.ab.nascimento",
      endereco: "Rua Francisco Teles, 41",
      telefone: "983989350",
      cpf: "1234567",
    });

    const repos = {
      carroRepo: new InMemoryCarRepository(),
      clientRepo: new InMemoryClientRepository(),
    };

    const aluguel = {
      rg: await repos.clientRepo.registrar(userMock).then((res) => {
        return res.props.cpf;
      }),
      placaCarro: await repos.carroRepo.registrar(carroMock).then((res) => {
        return res.props.placa;
      }),
    };

    const sut = new AlugarCarroUseCase(repos.clientRepo, repos.carroRepo);

    const response = await sut.execute(aluguel).then((res) => {
      return res;
    });

    expect(response).toBeInstanceOf(Error);
  });
});
