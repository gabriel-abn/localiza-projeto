import faker from "@faker-js/faker";
import { Client } from "../../../src/domain/Client";

export const mockCliente = (placaCarro?: string): Client =>
  Client.create({
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
