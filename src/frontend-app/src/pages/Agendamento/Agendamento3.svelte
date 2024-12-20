<!-- Agendamento3.svelte -->
<script>
    import { irParaHome } from "../../stores/navigation"; // Função para ir para a página inicial após confirmação
  
    // Recuperando a data e o horário selecionados da localStorage
    let dataSelecionada = localStorage.getItem('dataSelecionada'); // Recupera a data
    let horarioSelecionado = JSON.parse(localStorage.getItem('horarioSelecionado')); // Recupera o horário
    let preco = localStorage.getItem('preco'); // Recupera o preço calculado
  
    // Função para confirmar o agendamento e redirecionar para a home
    const confirmarAgendamento = () => {
      // Aqui você pode fazer o processo de agendamento via API, ou simplesmente redirecionar
      // Após o agendamento, limpa o localStorage ou pode manter as informações dependendo do caso
      localStorage.clear(); // Limpa o localStorage após o agendamento
      irParaHome(); // Redireciona para a página inicial
    };
  </script>
  
  <main class="container mt-5">
    <h1 class="text-center mb-4">Confirmação do Agendamento</h1>
  
    {#if dataSelecionada && horarioSelecionado}
      <div class="alert alert-info">
        <strong>Data Selecionada:</strong> {dataSelecionada}
      </div>
  
      <div class="alert alert-info">
        <strong>Horário Selecionado:</strong> {horarioSelecionado.hora}
      </div>
    {/if}
  
    {#if preco}
      <div class="alert alert-success">
        <strong>Preço:</strong> R$ {preco}
      </div>
    {/if}
  
    <div class="text-center mt-4">
      <p>Gostaria de confirmar o agendamento?</p>
      <button class="btn btn-success" on:click={confirmarAgendamento}>Confirmar Agendamento</button>
      <button class="btn btn-secondary" on:click={irParaHome}>Cancelar</button>
    </div>
  </main>
  