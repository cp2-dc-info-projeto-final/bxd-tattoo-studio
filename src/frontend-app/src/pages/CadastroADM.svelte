<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import { api_base_url, irParaLogin, paginaAtual } from "../stores/navigation"; // Ajuste o caminho conforme necessário

  // Inicializando variáveis
  export let nome = "";
  export let user = "";
  export let senha = "";
  export let conf_senha = "";
  export let error = null;
  export let resultado = null;
  
  // Função para cadastrar um novo administrador
  const cadastrarAdm = async () => {
    if (senha !== conf_senha) {
      error = "As senhas não coincidem.";
      resultado = null;
      return;
    }
    try {
      let res = await axios.post(
        `${api_base_url}/adm/novo`,
        { nome, user, senha, conf_senha },
        {
          headers: { Accept: "application/json" },
          withCredentials: true, // Permite o envio de cookies com a requisição
        }
      );
      resultado = res.data;
      error = null;
      paginaAtual.set("login"); // Após cadastro bem-sucedido, redireciona para a página de login
    } catch (err) {
      console.error(err);
      resultado = null;
      error = err.response?.data?.message || "Erro ao cadastrar administrador.";
    }
  };
</script>

<main>
  <h1>Cadastro de Administrador</h1>

  <form on:submit|preventDefault={cadastrarAdm}>
    <div>
      <label for="nome">Nome</label>
      <input type="text" id="nome" bind:value={nome} required />
    </div>

    <div>
      <label for="user">Usuário</label>
      <input type="text" id="user" bind:value={user} required />
    </div>

    <div>
      <label for="senha">Senha</label>
      <input type="password" id="senha" bind:value={senha} required />
    </div>

    <div>
      <label for="conf_senha">Confirmar Senha</label>
      <input type="password" id="conf_senha" bind:value={conf_senha} required />
    </div>

    {#if error}
      <div class="error">{error}</div>
    {/if}

    {#if resultado}
      <div class="success">{resultado.message}</div>
    {/if}

    <button type="submit">Cadastrar</button>
  </form>

  <p>Já possui uma conta? <button on:click={irParaLogin}></button></p>
</main>
