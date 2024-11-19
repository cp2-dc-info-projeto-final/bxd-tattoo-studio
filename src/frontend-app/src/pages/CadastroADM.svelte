<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import { api_base_url, paginaAtual } from "../stores/navigation";

  // Inicializando variáveis
  export let nome = "";
  export let user = "";
  export let senha = "";
  export let conf_senha = "";
  export let error = null;
  export let resultado = null;
  export let adms = [];
  export let colunas_adms = [];

  // Função para carregar a lista de administradores
  const carregarAdms = async () => {
    try {
      let res = await axios.get(`${api_base_url}/adms`, {
        responseType: "json",
        headers: {
          Accept: "application/json",
        },
      });
      adms = res.data.adms || [];
      colunas_adms = adms.length > 0 ? Object.keys(adms[0]) : [];
      error = null; // Limpa o erro se a requisição for bem-sucedida
    } catch (err) {
      console.error(err);
      adms = [];
      colunas_adms = [];
        }
  };

  // Função para cadastrar um novo administrador
  const cadastrarAdms = async () => {
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
      await carregarAdms(); // Atualiza a lista após o cadastro
      paginaAtual.set("login")
    } catch (err) {
      console.error(err);
      resultado = null;
      error = err.response?.data?.message || "Erro ao cadastrar o administrador.";
    }
  };

</script>

<main>
  <div class="container mt-5">
    <div class="row justify-content-center m-auto align-items-center d-flex" style="width: 600px; padding-top: 100px; padding-bottom: 100px;">
      <div class="col-md-5">
        <h2 class="text-center mb-4">Cadastrar-se</h2>
        <form on:submit|preventDefault={cadastrarAdms}>
          <div class="mb-3">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" class="form-control" id="nome" bind:value={nome} placeholder="Digite seu nome" required />
          </div>
          <div class="mb-3">
            <label for="User" class="form-label">User</label>
            <input type="text" class="form-control" id="User" bind:value={user} placeholder="Digite seu User" required />
          </div>
          <div class="mb-3">
            <label for="senha" class="form-label">Senha</label>
            <input type="password" class="form-control" id="senha" bind:value={senha} placeholder="Digite sua senha" required />
          </div>
          <div class="mb-3">
            <label for="conf_senha" class="form-label">Confirme sua senha</label>
            <input type="password" class="form-control" id="conf_senha" bind:value={conf_senha} placeholder="Confirme sua senha" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Cadastrar</button>
        </form>
        {#if error}
          <p style="color: red;">{error}</p>
        {/if}
        {#if resultado && resultado.message}
          <p style="color: green;">{resultado.message}</p>
        {/if}
      </div>
    </div>
</main>
