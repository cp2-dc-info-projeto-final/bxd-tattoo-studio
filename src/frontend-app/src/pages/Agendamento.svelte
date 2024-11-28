<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { format } from 'date-fns';

  const horarios = writable([]);
  let selectedHorario = null;
  const hoje = format(new Date(), 'dd/MM/yyyy'); // Data no formato DD/MM/YYYY

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

  async function agendarHorario() {
    if (!selectedHorario) return;
    try {
      const res = await fetch(`/horarios/${selectedHorario}/agendar`, {
        method: 'PATCH'
      });
      if (res.ok) {
        alert('Horário agendado com sucesso!');
        carregarHorarios(); // Atualiza a lista de horários
      } else {
        const { message } = await res.json();
        alert(message || 'Erro ao agendar horário.');
      }
    } catch (error) {
      console.error('Erro ao agendar horário:', error);
    }
  }

  onMount(carregarHorarios);
</script>

<div class="container mt-4">
  <h1 class="text-center mb-4">Agendamento de Horários</h1>
  <p class="text-center mb-4">Data de hoje: <strong>{hoje}</strong></p>

  {#if $horarios.length > 0}
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Horário</th>
          <th>Disponibilidade</th>
          <th>Selecionar</th>
        </tr>
      </thead>
      <tbody>
        {#each $horarios as horario}
          <tr>
            <td>{horario.hora}</td>
            <td>{horario.disponibilidade ? 'Disponível' : 'Indisponível'}</td>
            <td>
              <input 
                type="radio" 
                name="horario" 
                value={horario.id_horario} 
                bind:group={selectedHorario}
              />
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <button 
      class="btn btn-primary mt-3" 
      on:click={agendarHorario} 
      disabled={!selectedHorario}
    >
      Agendar Horário
    </button>
  {:else}
    <p class="text-center">Nenhum horário disponível.</p>
  {/if}
</div>
