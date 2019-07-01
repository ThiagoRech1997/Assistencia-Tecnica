### Requisitos do sistema

#### Para API
 - Cadastrar previamente o cliente
 - Cadastrar Orden de Serviço
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
      "cadastroDat": Date
    }
Funcionários:

	funcionarios{
      "nome": String,
      "cpf": String,
      "telefone": String,
      "email": String,
      "cadastroDat": Date
    }    
Serviços:

	servicos{
      "descricao": String,
      "itens":{
        "descricao": String,
        "quantidade": number,
        "valor": number
      },
      cliente: {
        "nome": String,
        "email": String
      },
      funcionario: {
        "nome": String,
        "email": String
      },
      "dataEmicao": Date,
      "valor": number,
      "status": String,
      "cadastroDat": Date
    }
Orçamento: 

	orcamento{
      "descricao": String,
      "itens":{
        "descricao": String,
        "quantidade": number,
        "valor": number
      },
      cliente: {
        "nome": String,
        "email": String
      },
      funcionario: {
        "nome": String,
        "email": String
      },
      "aprovacao": String,
      "cadastroDat": Date
    }
Usuarios:

	users{
  	"nome": String,
     "email": String,
     "senha": String,
     "tipo": String,
     "cadastroDat": Date
    }
 