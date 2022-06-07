import faker from "@faker-js/faker";
import { Cliente } from "../../../src/domain/Cliente";

export const mockCliente = (placaCarro?: string): Cliente =>
  Cliente.create({
    nome: faker.name.findName(),
    cnh: faker.datatype.uuid(),
    email: faker.internet.email(),
    telefone: faker.phone.phoneNumber("031 9####-####"),
    senhaAcesso: faker.internet.password(),
    isAdmin: false
  });
