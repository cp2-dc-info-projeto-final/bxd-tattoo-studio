<script>
    import { onMount } from "svelte";
    import axios from "axios";
    import { api_base_url, paginaAtual } from "../stores/navigation";
  
    // Inicializando variáveis
    export let hora = "";
    export let error = null;
    export let resultado = null;
  
    // Função para cadastrar um novo horário
    const cadastrarHorario = async () => {
      if (!hora) {
        error = "O campo 'hora' é obrigatório.";
        resultado = null;
        return;
      }
      
      try {
        let res = await axios.post(
          `${api_base_url}/horario/novo`,
          { hora },
          {
            headers: { Accept: "application/json" },
            withCredentials: true, // Permite o envio de cookies com a requisição
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
  
    // Função para listar os horários cadastrados
    let horarios = [];
    const carregarHorarios = async () => {
      try {
        let res = await axios.get(`${api_base_url}/horarios`, {
          headers: { Accept: "application/json" },
        });
        horarios = res.data.result.horarios || [];
      } catch (err) {
        console.error(err);
        horarios = [];
      }
    };
  
    // Chamada para carregar os horários ao montar a página
    onMount(() => {
      carregarHorarios();
    });
  </script>
  
  <!-- Página de Cadastro de Horários -->
  <main>
    <h1>Cadastro de Horário</h1>
    
    <!-- Formulário de cadastro -->
    <form on:submit|preventDefault={cadastrarHorario}>
      <div>
        <label for="hora">Hora:</label>
        <input 
          type="text" 
          id="hora" 
          bind:value={hora} 
          placeholder="Digite o horário (ex: 08:00)"
          required
        />
      </div>
  
      {#if error}
        <p class="error">{error}</p>
      {/if}
  
      <button type="submit">Cadastrar Horário</button>
    </form>
  
    {#if resultado}
      <p class="success">{resultado.message}</p>
    {/if}
  
    <h2>Horários Cadastrados</h2>
    <!-- Lista de horários cadastrados -->
    <ul>
      {#each horarios as horario}
        <li>{horario.hora} - {horario.disponibilidade ? "Disponível" : "Indisponível"}</li>
      {/each}
    </ul>
  </main>