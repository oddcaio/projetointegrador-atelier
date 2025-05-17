# Projeto Atelier Opção - Setup Local

Este documento descreve as tecnologias utilizadas e o passo a passo para executar o projeto localmente.

---

## Tecnologias Utilizadas

- **Backend**: Java Spring Boot  
- **Banco de Dados**: PostgreSQL com PgAdmin para gerenciamento  
- **Frontend**: React + Vite  
- **Gerenciamento de Dependências Frontend**: npm  
- **Testes**: Vitest (para testes frontend)  
---

## Pré-requisitos

- Java JDK 17 ou superior instalado  
- PostgreSQL instalado e em execução  
- PgAdmin para administração do banco  
- Node.js e npm instalados (versão recomendada: 16.x ou superior)  
- IntelliJ IDEA para backend  

---

## Configuração do Banco de Dados

1. Crie o banco PostgreSQL e importe os scripts SQL do projeto (tabelas e dados).  
2. Configure o usuário e senha que terá acesso ao banco.  

---

## Configuração do Backend (Spring Boot)

1. Abra o projeto no IntelliJ IDEA.  
2. No arquivo `src/main/resources/application.properties`, altere as seguintes propriedades conforme seu banco:  

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/seu_banco
   spring.datasource.username=postgres_ou_seu_usuario
   spring.datasource.password=sua_senha

---

## Configuração do Frontend (React + Vite)

1. Navegue até a pasta `frontend` dentro do projeto.  
2. Instale as dependências executando o comando:  

   `npm install`

3. Após a instalação, execute o servidor de desenvolvimento com o comando:  

   `npm run dev`

4. O servidor estará rodando geralmente em http://localhost:5173 (ou outra porta configurada pelo Vite).  
5. Acesse essa URL no navegador para usar a aplicação frontend.  

Obs: se alterar a porta no frontend, tem que alterar a url no backend em application.properties.

6. Para visualizar os testes unitários, dentro da pasta frontend execute o comando: 
   `npm run test`

Se quiser testar um arquivo solitário, abra ele e execute o mesmo comando, ou, se já aberto, apenas salve o arquivo com ctrl+s que irá executar novamente.

