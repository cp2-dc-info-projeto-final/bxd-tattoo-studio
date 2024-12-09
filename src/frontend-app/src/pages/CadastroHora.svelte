<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import { api_base_url } from "../stores/navigation";

  export let datetime = "";
  export let error = null;
  export let resultado = null;

  const cadastrarHorario = async () => {
    try {
      let res = await axios.post(
        `${api_base_url}/horario/novo`,
        { datetime },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}` // Passa o token do usuário autenticado
          },
          withCredentials: true,
        }
      );
      resultado = res.data;
      error = null;
      datetime = ""; // Limpa o campo após sucesso
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
