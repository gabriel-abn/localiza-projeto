import { Client } from "../../../src/domain/Client";

export const mockCliente = (placaCarro?: string): Client =>
  Client.create({
    nome: "Teste cliente",
    cartao: "12345678",
    cnh: "CNH00999",
    dataNascimento: "20/09/2000",
    email: "gabriel.ab.nascimento",
    endereco: "Rua Francisco Teles, 41",
    telefone: "983989350",
    cpf: "1234567",
    placa: placaCarro || "LIVRE",
    senhaAcesso: "",
  });
