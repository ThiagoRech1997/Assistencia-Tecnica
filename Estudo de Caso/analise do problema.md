# Andamento da manutenção
A aplicação devera informar os status do procedimento de reparo, notificando o cliente sempre que há alguma alteração.

### Caracteristicas do problema

#### Para API
 - Cadastrar previamente o cliente
 - Cadastrar Orden de Serviço
 - Após registro da ordem enviar credenciais por e-mail
 - A cada atualização do processo de matutenção ou orçamento enviar uma notificação para o cliente
 - Solicitar aprovação do cliente para o orcamento

#### Para APP
 - Visuaplizar historico de serviços prestados
 - Acompanhar com detalhes cada uma das ordens de serviço

Para o banco de dados havera uma estrutura simples de collections

   clientes{
      "nome": String,
      "rg": String,
      "cpf": String,
      "telefone": String,
      "email": String,
      "usuario": String,
      "senha": String
   }

   servicos{
      "descricao": String,
      "cliente": String,
      "dataEmicao": date,
      "valor": number,
      "status": String
   }

   orcamento{
      "descricao": String,
      "cliente": String,
      "aprovacao": boolean
   }