<script>
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import axios from "axios";

  const apiBaseUrl = "http://localhost:3000";
  const servicos = writable([]);
  let servicoParaEditar = null;
  let precoEditado = "";
  let mensagem = "";
  let error = false;

  const carregarServicos = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/servicos`, {
        withCredentials: true,
      });

      if (response.data?.result?.servicos) {
        servicos.set(response.data.result.servicos);
      } else {
        throw new Error("Estrutura de dados inesperada.");
      }
    } catch (error) {
      console.error("Erro ao carregar serviços:", error);
      mensagem = "Erro ao carregar a lista de serviços.";
      error = true;
    }
  };

  const editarPrecoServico = async (id_servico, preco) => {
    try {
      const response = await axios.put(
        `${apiBaseUrl}/servicos/${id_servico}`,
        { preco },
        { withCredentials: true }
      );
      if (response.status !== 200) throw new Error("Erro ao editar o serviço.");
      await carregarServicos();
      cancelarEdicao();
      mensagem = "Preço atualizado com sucesso!";
      error = false;
    } catch (err) {
      console.error("Erro ao editar serviço:", err);
      mensagem = "Erro ao editar serviço.";
      error = true;
    }
  };

  const excluirServico = async (id_servico) => {
    if (confirm("Tem certeza que deseja excluir este serviço?")) {
      try {
        const response = await axios.delete(
          `${apiBaseUrl}/servicos/${id_servico}`,
          { withCredentials: true }
        );
        if (response.status !== 200) throw new Error("Erro ao excluir o serviço.");
        await carregarServicos();
        mensagem = "Serviço excluído com sucesso!";
        error = false;
      } catch (error) {
        console.error("Erro ao excluir serviço:", error);
        mensagem = "Erro ao excluir serviço.";
        error = true;
      }
    }
  };

  const iniciarEdicao = (servico) => {
    servicoParaEditar = servico;
    precoEditado = servico.preco;
  };

  const cancelarEdicao = () => {
    servicoParaEditar = null;
    precoEditado = "";
  };

  onMount(() => {
    carregarServicos();
  });
</script>

<main>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Lista de Serviços</h1>

    <!-- Mensagem de status -->
    {#if mensagem}
      <div class="alert {error ? 'alert-danger' : 'alert-success'} text-center">
        {mensagem}
      </div>
    {/if}

    <!-- Tabela responsiva -->
    <div class="table-responsive">
      <table class="table table-bordered table-hover">
        <thead class="thead-light">
          <tr>
            <th class="text-center">ID</th>
            <th class="text-center">Tamanho</th>
            <th class="text-center">Complexidade</th>
            <th class="text-center">Cores</th>
            <th class="text-center">Preço</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {#each $servicos as servico}
            <tr>
              <td class="text-center align-middle">{servico.id_servico}</td>
              <td class="text-center align-middle">{servico.tamanho}</td>
              <td class="text-center align-middle">{servico.complexidade}</td>
              <td class="text-center align-middle">{servico.cores}</td>
              <td class="text-center align-middle text-success fw-bold">
                R$ {servico.preco.toFixed(2)}
              </td>
              <td class="text-center align-middle">
                <button
                  on:click={() => iniciarEdicao(servico)}
                  class="btn btn-warning btn-sm me-2">
                  <img src="../../static/lapis.png" alt="Editar" style="width: 16px;" />
                </button>
                <button
                  on:click={() => excluirServico(servico.id_servico)}
                  class="btn btn-danger btn-sm">
                  <img src="../../static/trash.png" alt="Excluir" style="width: 16px;" />
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Modal para editar preço -->
    {#if servicoParaEditar}
      <div class="modal fade show" style="display: block;">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Editar Preço</h5>
              <button
                type="button"
                class="btn-close"
                aria-label="Close"
                on:click={cancelarEdicao}></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="tamanhoServico" class="form-label">Tamanho:</label>
                  <input
                    type="text"
                    id="tamanhoServico"
                    class="form-control"
                    value={servicoParaEditar.tamanho}
                    disabled
                  />
                </div>
                <div class="mb-3">
                  <label for="complexidadeServico" class="form-label">Complexidade:</label>
                  <input
                    type="text"
                    id="complexidadeServico"
                    class="form-control"
                    value={servicoParaEditar.complexidade}
                    disabled
                  />
                </div>
                <div class="mb-3">
                  <label for="coresServico" class="form-label">Cores:</label>
                  <input
                    type="text"
                    id="coresServico"
                    class="form-control"
                    value={servicoParaEditar.cores}
                    disabled
                  />
                </div>
                <div class="mb-3">
                  <label for="precoEditado" class="form-label">Preço:</label>
                  <input
                    type="number"
                    id="precoEditado"
                    bind:value={precoEditado}
                    class="form-control"
                    step="0.01"
                    min="0"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                on:click={cancelarEdicao}>Cancelar</button>
              <button
                type="button"
                class="btn btn-success"
                on:click={() =>
                  editarPrecoServico(servicoParaEditar.id_servico, parseFloat(precoEditado))}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</main>

<style>
  .table-bordered th,
  .table-bordered td {
    border: 2px solid #dee2e6;
  }

  .thead-light th {
    background-color: #f8f9fa;
    font-weight: bold;
  }

  .table-hover tbody tr:hover {
    background-color: #f1f3f5;
  }

  .btn {
    border-radius: 4px;
  }

  .btn-warning {
    background-color: #ffc107;
    border-color: #ffca2c;
  }

  .btn-warning:hover {
    background-color: #e0a800;
    border-color: #d39e00;
  }

  .btn-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #000;
  }

  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-dialog {
    max-width: 90%;
  }

  textarea[disabled],
  input[disabled] {
    background-color: #f8f9fa !important;
  }
</style>
