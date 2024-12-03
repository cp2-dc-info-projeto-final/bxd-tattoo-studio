<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import axios from 'axios'; // Adicionando o axios

  const horarios = writable([]);
  let novoHorario = '';

  // Função para carregar horários cadastrados
  async function carregarHorarios() {
    try {
      const res = await axios.get('/horarios');
      horarios.set(res.data); // Atualiza os horários no store
    } catch (error) {
      console.error('Erro ao carregar horários:', error);
    }
  }

  // Função para adicionar um novo horário
  async function adicionarHorario() {
    try {
      const res = await axios.post('/horarios', {
        hora: novoHorario
      });
      if (res.status === 201) { // Verifica se o status é 201 (criado)
        alert('Horário adicionado com sucesso!');
        novoHorario = ''; // Limpa o campo de novo horário
        carregarHorarios(); // Recarrega a lista de horários
      } else {
        alert('Erro ao adicionar horário.');
      }
    } catch (error) {
      console.error('Erro ao adicionar horário:', error);
      alert('Erro ao adicionar horário.');
    }
  }

  // Função para excluir um horário
  async function excluirHorario(id) {
    try {
      const res = await axios.delete(`/horarios/${id}`);
      if (res.status === 200) { // Verifica se o status é 200 (OK)
        alert('Horário excluído com sucesso!');
        carregarHorarios(); // Recarrega a lista de horários
      } else {
        alert('Erro ao excluir horário.');
      }
    } catch (error) {
      console.error('Erro ao excluir horário:', error);
      alert('Erro ao excluir horário.');
    }
  }

  // Chamada inicial para carregar os horários
  onMount(carregarHorarios);
</script>

<div class="container mt-4">
  <h1 class="text-center mb-4">Administração de Horários</h1>

  <div class="mb-4">
    <label for="novoHorario" class="form-label">Novo Horário (HH:MM):</label>
    <input 
      id="novoHorario" 
      class="form-control" 
      type="text" 
      bind:value={novoHorario} 
      placeholder="Ex: 22:00" 
    />
    <button 
      class="btn btn-success mt-3" 
      on:click={adicionarHorario} 
      disabled={!novoHorario}
    >
      Adicionar Horário
    </button>
  </div>

  {#if $horarios.length > 0}
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Horário</th>
          <th>Disponibilidade</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {#each $horarios as horario}
          <tr>
            <td>{horario.hora}</td>
            <td>{horario.disponibilidade ? 'Disponível' : 'Indisponível'}</td>
            <td>
              <button 
                class="btn btn-danger" 
                on:click={() => excluirHorario(horario.id_horario)}
              >
                Excluir
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <p class="text-center">Nenhum horário cadastrado.</p>
  {/if}
</div>
