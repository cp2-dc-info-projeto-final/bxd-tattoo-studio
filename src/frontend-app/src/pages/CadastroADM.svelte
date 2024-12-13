<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import { api_base_url, irParaLogin, paginaAtual } from "../stores/navigation";

  export let nome = "";
  export let user = "";
  export let senha = "";
  export let conf_senha = "";
  export let error = null;
  export let resultado = null;

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
          withCredentials: true,
        }
      );
      resultado = res.data;
      error = null;
      paginaAtual.set("login");
    } catch (err) {
      console.error(err);
      resultado = null;
      error = err.response?.data?.message || "Erro ao cadastrar administrador.";
    }
  };
</script>

<main class="container mt-5">
  <h1 class="text-center mb-4">Cadastro de Administrador</h1>

  <form class="row g-3" on:submit|preventDefault={cadastrarAdm}>
    <div class="col-12 col-md-6">
      <label for="nome" class="form-label">Nome</label>
      <input 
        type="text" 
        id="nome" 
        bind:value={nome} 
        class="form-control" 
        required 
      />
    </div>

    <div class="col-12 col-md-6">
      <label for="user" class="form-label">Usuário</label>
      <input 
        type="text" 
        id="user" 
        bind:value={user} 
        class="form-control" 
        required 
      />
    </div>

    <div class="col-12 col-md-6">
      <label for="senha" class="form-label">Senha</label>
      <input 
        type="password" 
        id="senha" 
        bind:value={senha} 
        class="form-control" 
        required 
      />
    </div>

    <div class="col-12 col-md-6">
      <label for="conf_senha" class="form-label">Confirmar Senha</label>
      <input 
        type="password" 
        id="conf_senha" 
        bind:value={conf_senha} 
        class="form-control" 
        required 
      />
    </div>

    {#if error}
      <div class="col-12 alert alert-danger">{error}</div>
    {/if}

    {#if resultado}
      <div class="col-12 alert alert-success">{resultado.message}</div>
    {/if}

    <div class="col-12 text-center">
      <button type="submit" class="btn btn-primary w-100 w-md-auto">Cadastrar</button>
    </div>
  </form>

  <p class="text-center mt-3">
    Já possui uma conta? 
    <button class="btn btn-link p-0" on:click={irParaLogin}>Clique aqui para fazer login</button>
  </p>
</main>

<style>
  main {
    max-width: 100%;
    margin: auto;
    padding: 15px;
  }

  @media (min-width: 768px) {
    main {
      max-width: 600px;
    }
  }
</style>
