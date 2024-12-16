<script>
    import { onMount } from "svelte";
    import axios from "axios";
    import { api_base_url } from "../stores/navigation"; 
    import HeaderAdm from "./header/HeaderAdm.svelte";
  
    // Variáveis reativas para o formulário
    export let data = "";
    export let horario = "";
    export let mensagem = null;
    export let error = null;
  
    // Função para enviar um novo horário à API
    const cadastrarHorario = async () => {
      if (!data || !horario) {
        error = "Data e horário são obrigatórios.";
        mensagem = null;
        return;
      }
  
      // Formata a data e o horário
      const horaFormatada = `${data} ${horario}`;
      try {
        const res = await axios.post(
          `${api_base_url}/horario/novo`,
          { hora: horaFormatada },
          {
            headers: { Accept: "application/json" },
            withCredentials: true, // Inclui os cookies para autenticação
          }
        );
        mensagem = res.data.message;
        error = null;
      } catch (err) {
        error = err.response?.data?.message || "Erro ao cadastrar horário.";
        mensagem = null;
      }
    };
  </script>
  
  <HeaderAdm />
  <main>
    <div class="container mt-5">
      <div class="row justify-content-center align-items-center">
        <div class="col-lg-6 col-md-8 col-sm-12">
          <h2 class="text-center mb-4">Disponibilizar Horários</h2>
          <form on:submit|preventDefault={cadastrarHorario}>
            <div class="mb-3">
              <label for="data" class="form-label">Data</label>
              <input
                type="date"
                id="data"
                class="form-control"
                bind:value={data}
                required
              />
            </div>
  
            <div class="mb-3">
              <label for="horario" class="form-label">Horário</label>
              <input
                type="time"
                id="horario"
                class="form-control"
                bind:value={horario}
                required
              />
            </div>
  
            <button type="submit" class="btn btn-primary w-100">Cadastrar Horário</button>
          </form>
  
          {#if mensagem}
            <p class="alert alert-success mt-3">{mensagem}</p>
          {/if}
  
          {#if error}
            <p class="alert alert-danger mt-3">{error}</p>
          {/if}
        </div>
      </div>
    </div>
  </main>
  