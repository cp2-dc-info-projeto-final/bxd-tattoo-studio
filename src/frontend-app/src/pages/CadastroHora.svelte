<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import { api_base_url } from "../stores/navigation"; // Ajuste o caminho conforme necessário

  // Variáveis para os dados do formulário
  export let usuario_sk = null
  export let datetime = "";
  export let error = null;
  export let resultado = null;

  // Função para cadastrar um novo horário
  const cadastrarHorario = async () => {
    usuario_sk = null
    try {
      let res = await axios.post(
        `${api_base_url}/horario/novo`,
        { datetime, usuario_sk },
        {
          headers: { Accept: "application/json" },
          withCredentials: true, // Envia cookies se necessário para autenticação
        }
      );
      resultado = res.data;
      error = null;
    } catch (err) {
      console.error(err);
      resultado = null;
      error = err.response?.data?.message || "Erro ao cadastrar horário.";
    }
  };
</script>

<main class="container mt-5">
  <h1 class="text-center mb-4">Cadastro de Horário</h1>

  <form class="row g-3" on:submit|preventDefault={cadastrarHorario}>
    <div class="col-12">
      <label for="datetime" class="form-label">Data e Hora</label>
      <input
        type="datetime-local"
        id="datetime"
        bind:value={datetime}
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
      <button type="submit" class="btn btn-primary w-100 w-md-auto">Cadastrar Horário</button>
    </div>
  </form>
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