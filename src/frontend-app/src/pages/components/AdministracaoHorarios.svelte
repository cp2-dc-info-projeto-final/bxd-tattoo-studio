<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  const horarios = writable([]);
  let novoHorario = '';

  async function carregarHorarios() {
    try {
      const res = await fetch('/horarios');
      if (res.ok) {
        horarios.set(await res.json());
      }
    } catch (error) {
      console.error('Erro ao carregar horários:', error);
    }
  }

  async function adicionarHorario() {
    try {
      const res = await fetch('/horarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hora: novoHorario })
      });
      if (res.ok) {
        alert('Horário adicionado com sucesso!');
        novoHorario = '';
        carregarHorarios();
      } else {
        alert('Erro ao adicionar horário.');
      }
    } catch (error) {
      console.error('Erro ao adicionar horário:', error);
    }
  }

  async function excluirHorario(id) {
    try {
      const res = await fetch(`/horarios/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('Horário excluído com sucesso!');
        carregarHorarios();
      } else {
        alert('Erro ao excluir horário.');
      }
    } catch (error) {
      console.error('Erro ao excluir horário:', error);
    }
  }

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
