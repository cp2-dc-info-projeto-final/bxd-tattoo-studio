<!-- Agendamento1.svelte -->
<script>
  import { agendamento2 } from "../../stores/navigation"; // Função para ir para a página 2
  import axios from "axios";
  import { api_base_url } from "../../stores/navigation"; // Caminho da API

  let dataSelecionada = ""; // Data selecionada pelo usuário
  let horarios = []; // Horários disponíveis
  let errorMessage = ""; // Mensagem de erro

  // Função para buscar os horários disponíveis
  const fetchHorarios = async (data) => {
    try {
      if (!data) {
        errorMessage = "Por favor, selecione uma data.";
        return;
      }
      const res = await axios.get(`${api_base_url}/horarios/${data}`, {
        headers: { Accept: "application/json" },
        withCredentials: true,
      });
      horarios = res.data.result.horarios;
      errorMessage = "";
    } catch (err) {
      console.error("Erro ao buscar horários:", err);
      errorMessage = "Erro ao carregar os horários. Tente novamente.";
      horarios = [];
    }
  };

  // Função chamada ao enviar o formulário para buscar horários
  const buscarHorarios = () => {
    fetchHorarios(dataSelecionada);
  };

  // Função para selecionar um horário e avançar para a próxima etapa
  const selecionarHorario = (horario) => {
    // Armazenar a data selecionada junto com o horário no localStorage
    localStorage.setItem('dataSelecionada', dataSelecionada); // Armazena a data selecionada
    localStorage.setItem('horarioSelecionado', JSON.stringify(horario)); // Armazena o horário selecionado
    agendamento2(); // Vai para a próxima etapa
  };
</script>

<main class="container mt-5">
  <h1 class="text-center mb-4">Selecione um Horário</h1>

  <form class="row g-3" on:submit|preventDefault={buscarHorarios}>
    <div class="col-12">
      <label for="data" class="form-label">Selecione uma Data</label>
      <input
        type="date"
        id="data"
        bind:value={dataSelecionada}
        class="form-control"
        required
      />
    </div>

    <div class="col-12 text-center">
      <button type="submit" class="btn btn-primary w-100 w-md-auto">Buscar Horários</button>
    </div>
  </form>

  {#if errorMessage}
    <div class="col-12 alert alert-danger mt-3">{errorMessage}</div>
  {/if}

  {#if horarios.length === 0 && !errorMessage}
    <p class="text-center mt-3">Não há horários disponíveis nesta data.</p>
  {:else if horarios.length > 0}
    <h2 class="mt-4">Horários Disponíveis</h2>
    <table class="table table-striped mt-3">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Hora</th>
        </tr>
      </thead>
      <tbody>
        {#each horarios as horario}
          <tr on:click={() => selecionarHorario(horario)}>
            <td>{horario.id_horario}</td>
            <td>{horario.hora}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</main>
