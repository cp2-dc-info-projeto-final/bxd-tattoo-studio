<script>
  import { onMount } from "svelte";
  import axios from "axios";
  export let nome;
  export let email;
  export let idade;
  export let senha;
  export let conf_senha;
  export let error;
  export let resultado;
  export let usuarios;
  export let colunas_usuarios;
  import { api_base_url, irParaLogin, paginaAtual } from "../stores/navigation";

  const carregarUsuarios = async () => {
    try {
      let res = await axios.get(api_base_url + "/usuarios", {
        responseType: "json",
        headers: {
          Accept: "application/json",
        },
      });
      usuarios = res.data.usuarios;
      colunas_usuarios = Object.keys(usuarios[0]);
      error = null; // Limpa o erro se a requisição for bem-sucedida
    } catch (err) {
      console.error(err);
      usuarios = null; // Limpa o resultado em caso de erro
    }
  };

  const cadastrarUsuario = async () => {
    try {
      let res = await axios.post(
        api_base_url + "/usuarios/novo",
        {
          nome,
          email,
          idade,
          senha,
          conf_senha,
        },
        {
          headers: {
            Accept: "application/json",
          },
        },
      );
      resultado = res.data;
      error = null; // Limpa o erro se a requisição for bem-sucedida
      // recarrega lista de usuários apresentada
      carregarUsuarios();
      irParaLogin(); // Redireciona para página de Login
    } catch (err) {
      resultado = null; // Limpa o resultado em caso de erro
    }
  };

  carregarUsuarios();

  onMount(() => {
    carregarUsuarios();
  });
</script>

<main>
  <div class="container mt-5">
    <div class="row justify-content-center m-auto align-items-center d-flex" style="width: 600px; padding-top: 100px; padding-bottom: 100px;">
      <div class="col-md-5">
        <h2 class="text-center mb-4">Cadastrar-se</h2>
        <form on:submit|preventDefault={cadastrarUsuario}>
          <div class="mb-3">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" class="form-control" id="nome" bind:value={nome} placeholder="Digite seu nome" required />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" bind:value={email} placeholder="Digite seu email" required />
          </div>
          <div class="mb-3">
            <label for="idade" class="form-label">Idade</label>
            <input type="number" class="form-control" id="idade" bind:value={idade} placeholder="Digite sua idade" required />
          </div>
          <div class="mb-3">
            <label for="senha" class="form-label">Senha</label>
            <input type="password" class="form-control" id="senha" bind:value={senha} placeholder="Digite sua senha" required />
          </div>
          <div class="mb-3">
            <label for="conf_senha" class="form-label">Confirme sua senha</label>
            <input type="password" class="form-control" id="conf_senha" bind:value={conf_senha} placeholder="Confirme sua senha" required />
          </div>
          {#if senha===conf_senha}
          <button type="submit" class="btn btn-primary w-100">Cadastrar</button>
          {/if}
        </form>
        
        <p class="fs-5 pt-">Já possui cadastro?</p>
        <button on:click={irParaLogin} class="btn btn-success w-100">Logar-se</button>
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
