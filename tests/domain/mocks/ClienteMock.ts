import faker from "@faker-js/faker";
import { Cliente } from "../../../src/domain/Cliente";

export const mockCliente = (placaCarro?: string): Cliente =>
  Cliente.create({
    nome: faker.name.findName(),
    cartao: faker.finance.creditCardNumber(),
    cnh: faker.datatype.uuid(),
    dataNascimento: faker.date.past(),
    email: faker.internet.email(),
    endereco: faker.address.streetName(),
    telefone: faker.phone.phoneNumber("031 9####-####"),
    cpf: faker.phone.phoneNumber("###.###.###-##"),
    carroPlaca: placaCarro || null,
    senhaAcesso: faker.internet.password(),
  });
