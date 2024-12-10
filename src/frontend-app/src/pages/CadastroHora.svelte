<script>
  import { onMount } from 'svelte';
  let datetime = '';  // variável para armazenar a data e hora
  let mensagem = '';   // variável para exibir mensagem de sucesso ou erro

  // Função para enviar os dados do horário para a API
  const cadastrarHorario = async () => {
      try {
          // Verifica se o campo datetime está preenchido
          if (!datetime) {
              mensagem = 'Por favor, preencha o campo de data e hora.';
              return;
          }

          // Envia a requisição POST para a API
          const response = await fetch('http://localhost:3000/horario/novo', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  // 'Authorization': 'Bearer seu_token_aqui',  // Adicione o token se necessário
              },
              body: JSON.stringify({ datetime })
          });

          // Verifica a resposta da API
          if (response.ok) {
              const data = await response.json();
              mensagem = 'Horário cadastrado com sucesso!';
              console.log(data); // Aqui você pode processar os dados de resposta da API
          } else {
              const error = await response.json();
              mensagem = `Erro: ${error.message || 'Erro ao cadastrar horário'}`;
          }
      } catch (err) {
          // Captura erros na requisição
          mensagem = `Erro de comunicação: ${err.message}`;
      }
  };
</script>

<style>
  form {
      margin: 20px 0;
  }
  input {
      padding: 8px;
      margin: 10px 0;
      font-size: 14px;
      width: 100%;
      max-width: 300px;
  }
  button {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
  }
  button:hover {
      background-color: #45a049;
  }
  .mensagem {
      margin-top: 20px;
      padding: 10px;
      color: #fff;
      border-radius: 5px;
  }
  .sucesso {
      background-color: #4CAF50;
  }
  .erro {
      background-color: #f44336;
  }
</style>

<h1>Cadastrar Novo Horário</h1>

<form on:submit|preventDefault={cadastrarHorario}>
  <label for="datetime">Data e Hora:</label>
  <input type="datetime-local" id="datetime" bind:value={datetime} required />
  <button type="submit">Cadastrar</button>
</form>

{#if mensagem}
  <div class="mensagem {mensagem.includes('sucesso') ? 'sucesso' : 'erro'}">
      {mensagem}
  </div>
{/if}
