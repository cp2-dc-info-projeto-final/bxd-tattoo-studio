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

<main>
  <h1>Cadastro de Horário</h1>

  <form on:submit|preventDefault={cadastrarHorario}>
    <div>
      <label for="datetime">Data e Hora</label>
      <input
        type="datetime-local"
        id="datetime"
        bind:value={datetime}
        required
      />
    </div>

    {#if error}
      <div class="error">{error}</div>
    {/if}

    {#if resultado}
      <div class="success">{resultado.message}</div>
    {/if}

    <button type="submit">Cadastrar Horário</button>
  </form>
</main>
