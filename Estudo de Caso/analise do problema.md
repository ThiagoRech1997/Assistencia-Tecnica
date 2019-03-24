### Caracteristicas do problema
A aplicação devera informar os status do procedimento de reparo, notificando o cliente sempre que há alguma alteração.

### Requisitos do sistema

#### Para API
 - Cadastrar previamente o cliente
 - Cadastrar Orden de Serviço
 - Após registro da ordem enviar credenciais por e-mail
 - A cada atualização do processo de matutenção ou orçamento enviar uma notificação para o cliente
 - Solicitar aprovação do cliente para o orcamento

#### Para APP
 - Solicitar um cadastro no sistema
 - Conectar-se com o sistema
 - Visuaplizar historico de serviços prestados
 - Acompanhar com detalhes cada uma das ordens de serviço
 - Aprovar o orçamento

Para o banco de dados havera uma estrutura simples de collections

Clientes:

	clientes{
      "nome": String,
      "cpf": String,
      "telefone": String,
      "email": String,
      "usuario": String,
      "senha": String
    }
Funcionários:

	funcionarios{
      "nome": String,
      "cpf": String,
      "telefone": String,
      "email": String,
      "usuario": String,
      "senha": String
    }    
Serviços:

	servicos{
      "descricao": String,
      "itens":{
        "descricao": String,
        "quantidade": number,
        "valor": number
      },
      "cliente": String,
      "funcionario": String,
      "dataEmicao": date,
      "valor": number,
      "status": String
    }
Orçamento:

	orcamento{
      "descricao": String,
      "itens":{
        "descricao": String,
        "quantidade": number,
        "valor": number
      },
      "cliente": String,
      "funcionario": String,
      "aprovacao": boolean
    }