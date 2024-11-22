<script>
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import axios from "axios";

  const apiBaseUrl = "http://localhost:3000";
  const servicos = writable([]);
  let servicoParaEditar = null;
  let tamanhoEditado = "";
  let complexidadeEditada = "";
  let coresEditadas = "";
  let precoEditado = "";
  let mensagem = "";
  let error = false;

  // Função para carregar serviços
  const carregarServicos = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/servicos`, {
        withCredentials: true,
      });

      // Verifica se a estrutura de resposta é válida
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

  // Função para editar um serviço
  const editarServico = async (id_servico, dados) => {
    try {
      const response = await axios.put(
        `${apiBaseUrl}/servicos/${id_servico}`,
        dados,
        { withCredentials: true }
      );
      if (response.status !== 200) throw new Error("Erro ao editar serviço.");
      await carregarServicos();
      cancelarEdicao();
      mensagem = "Serviço atualizado com sucesso!";
      error = false;
    } catch (err) {
      console.error("Erro ao editar serviço:", err);
      mensagem = "Erro ao editar serviço.";
      error = true;
    }
  };

  // Função para excluir um serviço
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

  // Inicia edição de serviço
  const iniciarEdicao = (servico) => {
    servicoParaEditar = servico;
    tamanhoEditado = servico.tamanho;
    complexidadeEditada = servico.complexidade;
    coresEditadas = servico.cores;
    precoEditado = servico.preco;
  };

  // Cancela a edição
  const cancelarEdicao = () => {
    servicoParaEditar = null;
    tamanhoEditado = "";
    complexidadeEditada = "";
    coresEditadas = "";
    precoEditado = "";
  };

  // Carrega serviços ao montar a página
  onMount(() => {
    carregarServicos();
  });
</script>

<div class="container mt-4">
  <h1 class="text-center mb-4">Lista de Serviços</h1>

  <!-- Mensagem de status -->
  {#if mensagem}
    <div class="alert {error ? 'alert-danger' : 'alert-success'}">
      {mensagem}
    </div>
  {/if}

  <!-- Tabela responsiva -->
  <div class="table-responsive">
    <table class="table table-striped table-bordered">
      <thead class="thead-dark">
        <tr>
          <th>Tamanho</th>
          <th>Complexidade</th>
          <th>Cores</th>
          <th>Preço</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {#each $servicos as servico}
          <tr>
            <td>{servico.tamanho}</td>
            <td>{servico.complexidade}</td>
            <td>{servico.cores}</td>
            <td>{servico.preco}</td>
            <td>
              <button id="b1"
                on:click={() => iniciarEdicao(servico)}
                class=""><img src="../../static/lapis.png"></button>
              <button id="b2"
                on:click={() => excluirServico(servico.id_servico)}
                class="btn btn-danger btn-sm"><img src="../../static/trash.png" style="size: 20px;"></button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <!-- Modal para editar serviço -->
  {#if servicoParaEditar}
    <div class="modal fade show" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Serviço</h5>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="tamanhoEditado">Tamanho:</label>
              <input
                type="text"
                id="tamanhoEditado"
                bind:value={tamanhoEditado}
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="complexidadeEditada">Complexidade:</label>
              <input
                type="text"
                id="complexidadeEditada"
                bind:value={complexidadeEditada}
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="coresEditadas">Cores:</label>
              <input
                type="text"
                id="coresEditadas"
                bind:value={coresEditadas}
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="precoEditado">Preço:</label>
              <input
                type="number"
                id="precoEditado"
                bind:value={precoEditado}
                class="form-control"
              />
            </div>
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
                editarServico(servicoParaEditar.id_servico, {
                  tamanho: tamanhoEditado,
                  complexidade: complexidadeEditada,
                  cores: coresEditadas,
                  preco: precoEditado,
                })}>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>


<style>
  /* Customização para tabelas e modal em telas pequenas */
  .table-responsive {
    overflow-x: auto;
  }

  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-dialog {
    max-width: 90%;
  }
  
button#b1 {
  background-color: #af760b;
  color: #e0e0e0;
  border: 1px solid #5a5a5a;
  padding: 10px 16px;
  border-radius: 15px;
  height: 60px;
  width:70px;
}

  button#b2 {
  background-color: #9b1717;
  color: #e0e0e0;
  border: 1px solid #5a5a5a;
  padding: 10px 16px;
  border-radius: 15px;
  height: 60px;
  width:70px;
}

</style>