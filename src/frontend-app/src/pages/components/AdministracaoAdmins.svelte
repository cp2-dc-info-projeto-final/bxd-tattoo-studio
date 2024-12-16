<script>
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import axios from "axios";
  import HeaderAdm from "../header/HeaderAdm.svelte"

  const apiBaseUrl = "http://localhost:3000";
  const adms = writable([]);
  let admParaEditar = null;
  let nomeEditado = "";
  let userEditado = "";
  let senhaAdm = "";
  let mensagem = "";
  let error = false;

  // Função para carregar administradores
  const carregarAdms = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/adms`, {
        withCredentials: true,
      });

      // Verifica se a estrutura de resposta é válida
      if (response.data?.result?.adms) {
        adms.set(response.data.result.adms);
      } else {
        throw new Error("Estrutura de dados inesperada.");
      }
    } catch (error) {
      console.error("Erro ao carregar administradores:", error);
      mensagem = "Erro ao carregar a lista de administradores.";
      error = true;
    }
  };

  // Função para editar um administrador
  const editarAdm = async (id_adm, dados) => {
    try {
      const response = await axios.put(
        `${apiBaseUrl}/adms/${id_adm}`,
        dados,
        { withCredentials: true }
      );
      if (response.status !== 200) throw new Error("Erro ao editar administrador.");
      await carregarAdms();
      cancelarEdicao();
      mensagem = "Administrador atualizado com sucesso!";
      error = false;
    } catch (err) {
      console.error("Erro ao editar administrador:", err);
      mensagem = "Erro ao editar administrador.";
      error = true;
    }
  };

  // Função para excluir um administrador
  const excluirAdm = async (id_adm) => {
    if (confirm("Tem certeza que deseja excluir este administrador?")) {
      try {
        const response = await axios.delete(
          `${apiBaseUrl}/adms/${id_adm}`,
          { withCredentials: true }
        );
        if (response.status !== 200) throw new Error("Erro ao excluir o administrador.");
        await carregarAdms();
        mensagem = "Administrador excluído com sucesso!";
        error = false;
      } catch (error) {
        console.error("Erro ao excluir administrador:", error);
        mensagem = "Erro ao excluir administrador.";
        error = true;
      }
    }
  };

  // Inicia edição de administrador
  const iniciarEdicao = (adm) => {
    admParaEditar = adm;
    nomeEditado = adm.nome;
    userEditado = adm.user;
  };

  // Cancela a edição
  const cancelarEdicao = () => {
    admParaEditar = null;
    nomeEditado = "";
    userEditado = "";
    senhaAdm = "";
  };

  // Carrega administradores ao montar a página
  onMount(() => {
    carregarAdms();
  });
</script>

<HeaderAdm />
<main>
<div class="container mt-4">
  <h1 class="text-center mb-4">Lista de Administradores</h1>

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
          <th>Nome</th>
          <th>Usuário</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {#each $adms as adm}
          <tr>
            <td>{adm.nome}</td>
            <td>{adm.user}</td>
            <td>
              <button id="b1"
                on:click={() => iniciarEdicao(adm)}
                class="btn-warning"><img src="../../static/lapis.png"></button>
              <button id="b2"
                on:click={() => excluirAdm(adm.id_adm)}
                class="btn btn-danger btn-sm"><img src="../../static/trash.png" style="size: 20px;"></button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <!-- Modal para editar administrador -->
  {#if admParaEditar}
    <div class="modal fade show" style="display: block;" id="modal-geral">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" style="color: black;">Editar Administrador</h5>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="nomeEditado" style="color: black;">Nome:</label>
              <input
                type="text"
                id="nomeEditado"
                bind:value={nomeEditado}
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="userEditado" style="color: black;">Usuário:</label>
              <input
                type="text"
                id="userEditado"
                bind:value={userEditado}
                class="form-control"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              id="b-edit"
              type="button"
              class="btn btn-secondary"
              on:click={cancelarEdicao}>Cancelar</button>
            <button
              id="b-edit"
              type="button"
              class="btn btn-success"
              on:click={() =>
                editarAdm(admParaEditar.id_adm, {
                  nome: nomeEditado,
                  user: userEditado,
                  senha: senhaAdm,
                })}>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
</main>


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

</style>