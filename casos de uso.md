# Documentação de Casos de Uso - Site de Estúdio de Tatuagem

## Índice
1. [Caso de Uso 1 - Agendamento de Tatuagem](#caso-de-uso-1---agendamento-de-tatuagem)
2. [Caso de Uso 2 - Visualizar Portfólio de Tatuagens](#caso-de-uso-2---visualizar-portfólio-de-tatuagens)
3. [Caso de Uso 3 - Solicitação de Orçamento](#caso-de-uso-3---solicitação-de-orçamento)
4. [Caso de Uso 4 - Cadastro de Novo Cliente](#caso-de-uso-4---cadastro-de-novo-cliente)
5. [Caso de Uso 5 - Login de Cliente](#caso-de-uso-5---login-de-cliente)
6. [Caso de Uso 6 - Recuperação de Senha](#caso-de-uso-6---recuperação-de-senha)
7. [Caso de Uso 7 - Consultar Disponibilidade de Tatuadores](#caso-de-uso-7---consultar-disponibilidade-de-tatuadores)
8. [Caso de Uso 8 - Acompanhamento de Status do Pedido](#caso-de-uso-8---acompanhamento-de-status-do-pedido)
9. [Caso de Uso 9 - Deixar Avaliação de Tatuagem](#caso-de-uso-9---deixar-avaliação-de-tatuagem)
10. [Caso de Uso 10 - Agendar Sessão de Retorno](#caso-de-uso-10---agendar-sessão-de-retorno)
11. [Caso de Uso 11 - Consultar Informações sobre Cuidados Pós-Tatuagem](#caso-de-uso-11---consultar-informações-sobre-cuidados-pós-tatuagem)
12. [Caso de Uso 12 - Visualizar Promoções e Ofertas](#caso-de-uso-12---visualizar-promoções-e-ofertas)

---

## Caso de Uso 1 - Agendamento de Tatuagem

### Ator Principal
- Usuário (Cliente)

### Fluxo Principal
1. O cliente acessa o site do estúdio de tatuagem.
2. O cliente clica na opção "Agendar Tatuagem".
3. O sistema exibe um formulário de agendamento com campos como nome, telefone, e-mail, preferências de horário e tatuador escolhido.
4. O cliente preenche os campos do formulário.
5. O cliente seleciona a data e o horário desejado para a sessão de tatuagem.
6. O sistema valida as informações e verifica a disponibilidade do tatuador.
7. O cliente confirma o agendamento.
8. O sistema envia um e-mail de confirmação com os detalhes do agendamento.

### Fluxo Alternativo
- **A1: Tatuador não disponível**
  1. Caso o tatuador escolhido não esteja disponível na data solicitada, o sistema sugere outras opções de horários.
  2. O cliente escolhe outro horário e confirma.
  
- **A2: Campos de formulário inválidos**
  1. Caso algum campo obrigatório não seja preenchido corretamente, o sistema exibe uma mensagem de erro solicitando correções.
  2. O cliente corrige os dados e tenta novamente.

---

## Caso de Uso 2 - Visualizar Portfólio de Tatuagens

### Ator Principal
- Usuário (Cliente)

### Fluxo Principal
1. O cliente acessa o site do estúdio de tatuagem.
2. O cliente clica na opção "Portfólio".
3. O sistema exibe uma galeria com fotos de tatuagens realizadas pelo estúdio.
4. O cliente pode clicar nas fotos para ver detalhes das tatuagens.
5. O cliente navega pelas categorias de tatuagens (e.g., tradicional, realismo, tribal, etc.).

### Fluxo Alternativo
- **A1: Imagens não carregam**
  1. Caso as imagens não carreguem devido a problemas técnicos, o sistema exibe uma mensagem informando sobre a falha e sugere tentar novamente mais tarde.

---

## Caso de Uso 3 - Solicitação de Orçamento

### Ator Principal
- Usuário (Cliente)

### Fluxo Principal
1. O cliente acessa o site do estúdio de tatuagem.
2. O cliente clica na opção "Solicitar Orçamento".
3. O sistema exibe um formulário onde o cliente pode fornecer informações sobre o design da tatuagem, tamanho e localização no corpo.
4. O cliente preenche o formulário e envia.
5. O sistema envia uma solicitação para o estúdio.
6. O estúdio entra em contato com o cliente, enviando um orçamento personalizado.

### Fluxo Alternativo
- **A1: Cliente não fornece todas as informações**
  1. Caso o cliente não forneça informações suficientes, o sistema solicita os dados faltantes antes de enviar o orçamento.

---

## Caso de Uso 4 - Cadastro de Novo Cliente

### Ator Principal
- Usuário (Cliente)

### Fluxo Principal
1. O cliente acessa o site do estúdio de tatuagem.
2. O cliente clica na opção "Cadastrar-se" ou "Criar Conta".
3. O sistema exibe um formulário de cadastro com campos como nome, e-mail, telefone e senha.
4. O cliente preenche os campos obrigatórios.
5. O cliente confirma o cadastro.
6. O sistema envia um e-mail de confirmação de cadastro.

### Fluxo Alternativo
- **A1: E-mail já cadastrado**
  1. Caso o e-mail informado já esteja em uso, o sistema exibe uma mensagem informando que o e-mail já está registrado e sugere recuperação de senha.
  
- **A2: Campos inválidos**
  1. Caso o cliente insira dados inválidos (e.g., senha muito curta), o sistema exibe mensagens de erro.

---

## Caso de Uso 5 - Login de Cliente

### Ator Principal
- Usuário (Cliente)

### Fluxo Principal
1. O cliente acessa o site do estúdio de tatuagem.
2. O cliente clica na opção "Login".
3. O sistema solicita e-mail e senha.
4. O cliente fornece as informações de login.
5. O sistema valida as credenciais e permite o acesso à conta do cliente.

### Fluxo Alternativo
- **A1: E-mail ou senha inválidos**
  1. Caso o cliente insira credenciais inválidas, o sistema exibe uma mensagem de erro e solicita novas tentativas.

---

## Caso de Uso 6 - Recuperação de Senha

### Ator Principal
- Usuário (Cliente)

### Fluxo Principal
1. O cliente acessa a tela de login.
2. O cliente clica na opção "Esqueci minha senha".
3. O sistema solicita o e-mail do cliente.
4. O cliente fornece o e-mail.
5. O sistema envia um e-mail com um link para recuperação de senha.
6. O cliente acessa o link e redefine sua senha.

### Fluxo Alternativo
- **A1: E-mail não cadastrado**
  1. Caso o e-mail não esteja registrado, o sistema exibe uma mensagem informando que o e-mail não foi encontrado.

---

## Caso de Uso 7 - Consultar Disponibilidade de Tatuadores

### Ator Principal
- Usuário (Cliente)

### Fluxo Principal
1. O cliente acessa o site do estúdio de tatuagem.
2. O cliente clica na opção "Ver Disponibilidade de Tatuadores".
3. O sistema exibe uma lista de tatuadores e os horários disponíveis para agendamento.
4. O cliente escolhe o tatuador e horário desejado.

### Fluxo Alternativo
- **A1: Nenhuma disponibilidade**
  1. Caso todos os tatuadores estejam ocupados, o sistema exibe uma mensagem informando que não há horários disponíveis.

---

## Caso de Uso 8 - Acompanhamento de Status do Pedido

### Ator Principal
- Usuário (Cliente)

### Fluxo Principal
1. O cliente acessa o site do estúdio de tatuagem.
2. O cliente clica na opção "Acompanhar Pedido".
3. O sistema solicita que o cliente informe o número do pedido ou faça login na sua conta.
4. O cliente fornece as informações necessárias.
5. O sistema exibe o status atual do pedido.

### Fluxo Alternativo
- **A1: Pedido não encontrado**
  1. Caso o número do pedido seja inválido ou não exista, o sistema exibe uma mensagem informando que o pedido não foi encontrado.

---

## Caso de Uso 9 - Deixar Avaliação de Tatuagem

### Ator Principal
- Usuário (Cliente)

### Fluxo Principal
1. O cliente acessa o site do estúdio de tatuagem.
2. O cliente clica na opção "Avaliar Tatuagem".
3. O sistema exibe um formulário de avaliação com campos para a nota e comentário.
4. O cliente preenche os campos e envia a avaliação.
5. O sistema exibe uma mensagem de agradecimento.

### Fluxo Alternativo
- **A1: Avaliação incompleta**
  1. Caso o cliente não preencha todos os campos, o sistema solicita os dados faltantes.

---

## Caso de Uso 10 - Agendar Sessão de Retorno

### Ator Principal
- Usuário (Cliente)

### Fluxo Principal
1. O cliente acessa o site do estúdio de tatuagem.
2. O cliente clica na opção "Agendar Sessão de Retorno".
3. O sistema exibe um formulário para agendamento de sessões de retoques ou acompanhamento.
4. O cliente escolhe o tatuador e a data para a sessão.
5. O cliente confirma o agendamento.
6. O sistema envia um e-mail de confirmação.

---

## Caso de Uso 11 - Consultar Informações sobre Cuidados Pós-Tatuagem

### Ator Principal
- Usuário (Cliente)

### Fluxo Principal
1. O cliente acessa o site do estúdio de tatuagem.
2. O cliente clica na opção "Cuidados Pós-Tatuagem".
3. O sistema exibe uma página com informações sobre os cuidados necessários após a tatuagem.
4. O cliente lê as instruções e segue as recomendações.

---

## Caso de Uso 12 - Visualizar Promoções e Ofertas

### Ator Principal
- Usuário (Cliente)

### Fluxo Principal
1. O cliente acessa o site do estúdio de tatuagem.
2. O cliente clica na opção "Promoções".
3. O sistema exibe uma lista de ofertas e promoções atuais.
4. O cliente escolhe as promoções de interesse e pode entrar em contato para mais detalhes.

---
