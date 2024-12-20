<!-- Agendamento2.svelte -->
<script>
    import { agendamento3 } from "../../stores/navigation"; // Função para ir para a página 3
    import axios from "axios";
    import { api_base_url } from "../../stores/navigation"; // Caminho da API
  
    let tamanho = "";
    let complexidade = "";
    let cores = "";
    let preco = null;
    let errorPreco = null;
  
    // Recuperando a data e o horário selecionados do localStorage
    let dataSelecionada = localStorage.getItem('dataSelecionada'); // Recupera a data armazenada
    let horarioSelecionado = JSON.parse(localStorage.getItem('horarioSelecionado')); // Recupera o horário armazenado
  
    // Verificando se os dados estão sendo recuperados corretamente
    console.log('Data selecionada:', dataSelecionada);
    console.log('Horário selecionado:', horarioSelecionado);
  
    // Função para calcular o preço
    const calcularPreco = async () => {
      preco = null;
      errorPreco = null;
  
      try {
        const response = await axios.get(`${api_base_url}/preco-servico`, {
          params: { tamanho, complexidade, cores },
          headers: { Accept: "application/json" },
        });
  
        preco = response.data.result.preco;
      } catch (err) {
        console.error(err);
        errorPreco = err.response?.data?.message || "Erro ao calcular preço.";
      }
    };
  
    // Função para avançar para a próxima etapa e armazenar o preço calculado
    const avancarParaConfirmacao = () => {
      localStorage.setItem('preco', preco); // Armazena o preço
      agendamento3(); // Vai para a próxima etapa
    };
  </script>
  
  <main class="container mt-5">
    <h1 class="text-center mb-4">Calculadora de Preço</h1>
  
    <!-- Exibir a data selecionada na primeira etapa -->
    {#if dataSelecionada}
      <div class="alert alert-info">
        <strong>Data Selecionada:</strong> {dataSelecionada}
      </div>
    {/if}
  
    <!-- Exibir o horário selecionado na primeira etapa -->
    {#if horarioSelecionado}
      <div class="alert alert-info">
        <strong>Horário Selecionado:</strong> {horarioSelecionado.hora}
      </div>
    {/if}
  
    <form class="row g-3" on:submit|preventDefault={calcularPreco}>
      <!-- Tamanho -->
      <div class="col-12">
        <label for="tamanho" class="form-label">Tamanho (em centímetros)</label>
        <input type="number" id="tamanho" bind:value={tamanho} class="form-control" required min="0" step="1" />
      </div>
  
      <!-- Complexidade -->
      <div class="col-12">
        <label class="form-label">Complexidade</label>
        <div class="form-check">
          <input type="radio" id="simples" name="complexidade" bind:group={complexidade} value="simples" class="form-check-input" required />
          <label for="simples" class="form-check-label">Simples</label>
        </div>
        <div class="form-check">
          <input type="radio" id="complexa" name="complexidade" bind:group={complexidade} value="complexa" class="form-check-input" />
          <label for="complexa" class="form-check-label">Complexa</label>
        </div>
      </div>
  
      <!-- Cores -->
      <div class="col-12">
        <label class="form-label">Cores</label>
        <div class="form-check">
          <input type="radio" id="unicolor" name="cores" bind:group={cores} value="unicolor" class="form-check-input" required />
          <label for="unicolor" class="form-check-label">Unicolor</label>
        </div>
        <div class="form-check">
          <input type="radio" id="multicolor" name="cores" bind:group={cores} value="multicolor" class="form-check-input" />
          <label for="multicolor" class="form-check-label">Multicolor</label>
        </div>
      </div>
  
      {#if errorPreco}
        <div class="col-12 alert alert-danger">{errorPreco}</div>
      {/if}
  
      {#if preco !== null}
        <div class="col-12 alert alert-success">Preço: R$ {preco}</div>
      {/if}
  
      <div class="col-12 text-center">
        <button type="submit" class="btn btn-primary">Calcular Preço</button>
      </div>
    </form>
  
    {#if preco !== null}
      <div class="mt-4">
        <h3>Próxima Etapa</h3>
        <button class="btn btn-success" on:click={avancarParaConfirmacao}>Avançar para Confirmar Agendamento</button>
      </div>
    {/if}
  </main>
  