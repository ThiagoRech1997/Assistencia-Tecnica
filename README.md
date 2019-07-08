# Assistencia-Tecnica
Trabalho final para disciplina de Tecnologia em Desenvolvimento de Sistemas, curso Ciência da Computação - UTFPR-MD

### Apresentação do Problema
Você já passou por alguma situação onde levou um equipamento seu, doméstico,
celular, computador, para um reparo em alguma assistência técnica? Passou pela
necessidade de saber como estava a evolução na verificação dele? Precisou ligar
para ser atendido? Foi transferido para outras pessoas buscarem pelo status de
seu atendimento?

Isso é ruim, concorda? Não seria excelente se você tivesse a possibilidade de
acompanhar o serviço que está sendo realizado em seu equipamento? Desde a
entrega dele? Sem que você precisasse ligar para saber esssa situação?
Pois bem. 
Vamos então criar este aplicativo. Parta do princípio que a empresa
que prestará o serviço precisará cadastrá-lo antes de registrar a ordem de
serviço. 
Depois, ela precisará abrir a ordem de serviço e então enviará, por
email à você, seu nome de usuário e senha, que você poderá alterar com segurança
é claro.

Quando você acessar o portal ou aplicativo da empresa, e informar suas
credenciais, poderá visualizar todos os seus atendimentos, tendo o subsidio de
acompanhar cada um deles.

Por sua vez, a empresa, a cada atualização no processo de manutenção ou
orçamento em seu equipamento, atualizará o status de atendimento, enviando à
você mensagens pelo aplicativo, WhatsApp, SMS ou email, dentre outros possíveis
e você, pelo aplicativo ou portal, poderá aprovar ou não a execução do serviço.
Além do professor da disciplina, o Professor Angonse poderá auxiliar no 
levantamento das necessidades

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


**Para mais detalhes <a href='https://github.com/ThiagoRech1997/Assistencia-Tecnica/blob/master/Estudo%20de%20Caso/analise%20do%20problema.md'>Análize do Projeto</a>**

**Para ver capturas de tela do aplicativo mobile <a href='https://github.com/ThiagoRech1997/Assistencia-Tecnica/blob/master/Estudo%20de%20Caso/Screenshots.md'>Screenshots</a>**

## Uso do Projeto:
**Instalacao do NodeJS e do NPM**
- Acesse <a href='https://nodejs.org'>NodeJS</a>;
- Instale o NodeJS comforme instruçoes.

**Instalacao do MongoDB**
- Acesse <a href='https://www.mongodb.com/'>MongoDB</a> para baixar o MongoDB, siga as instrucoes para o download.
- Instale o MongoDB conforme instrucoes.

**Instalacao do Projeto**
- Clone do Projeto -> git clone https://github.com/ThiagoRech.1997/Assistencia-Tecnica.git .
- Instale as dependencias das pastas API e APP.
- Entre em cada uma delas e execute o comando: 'npm install'.
 
**Configurando APP para uso**
- Edite o endereco IP da API para o endereco do seu servidor no arquivo './src/services/api.js'.
- Inicie o aplicativo com o comando 'react-native run-android|ios'.


## Desenvolvido por Thiago Fernando Rech
<strong>Github:</strong> https://github.com/ThiagoRech.1997


<strong>E-mail</strong> thiagorech.1997@gmail.com
