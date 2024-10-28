<script>
  import { onMount } from "svelte";
  export let nome;
  export let user;
  export let senha;
  export let conf_senha;
  export let error;
  export let resultado;
  export let adms;
  export let colunas_adms;
  import { api_base_url } from "../stores/navigation";

  const carregarAdms = async () => {
    try {
      let res = await fetch(api_base_url + "/adms", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!res.ok) throw new Error(`Erro: ${res.statusText}`);
      let data = await res.json();
      adms = data.adms;
      colunas_adms = Object.keys(adms[0]);
      error = null; // Limpa o erro se a requisição for bem-sucedida
    } catch (err) {
      console.error(err);
      adms = null; // Limpa o resultado em caso de erro
    }
  };

  const cadastrarAdms = async () => {
    try {
      let res = await fetch(api_base_url + "/adm/novo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nome,
          user,
          senha,
          conf_senha,
        }),
      });

      if (!res.ok) throw new Error(`Erro: ${res.statusText}`);
      let data = await res.json();
      resultado = data;
      error = null; // Limpa o erro se a requisição for bem-sucedida
      carregarAdms(); // Recarrega a lista de administradores após o cadastro
    } catch (err) {
      console.error(err);
      error = "Erro ao cadastrar administrador";
      resultado = null; // Limpa o resultado em caso de erro
    }
  };

  carregarAdms();

  onMount(() => {
    carregarAdms();
  });
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
  </div>
</main>
