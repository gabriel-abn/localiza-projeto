# Desloca

Software proposto para a aula de Engenharia de Software do curso de Sistemas de Informação na Universidade Federal de Ouro Preto Campus João Monlevade.

# Instruções para uso

Usando o gerenciador de pacote _yarn_, basta executar o comando abaixo para instalar as dependências:

```
yarn
```

Para criar o banco de dados localmente, basta usar a CLI do Prisma para gerar as tabelas.
Primeiro, deve-se criar o arquivo _.env_ que terá as informações do banco de dados.
Exemplo usando MySQL:

```
DATABASE_URL="mysql://root:password@localhost:1234/deslocadb?schema=public"
```

Após ter criado o arquivo de variáveis do ambiente, basta executar o comando abaixo para gerar as tabelas no banco de dados informado.

```
yarn prisma migrate dev
```

Para executar os testes definidos no Back-End, basta executar o comando do Jest definido no arquivo [package.json](package.json) para verificar a execução dos testes e comunicação com o banco de dados.

```
yarn test
```

[Documento de requisitos](requirements/requirements.md)
