<script>
  import { writable } from "svelte/store";
  import HeaderAdm from "../header/HeaderAdm.svelte";
  import { onMount } from "svelte";
  import axios from "axios";

  const apiBaseUrl = "http://localhost:3000";
  const usuarios = writable([]);
  let usuarioParaEditar = null;
  let nomeEditado = "";
  let emailEditado = "";
  let idadeEditada = "";
  let senhaAdm = "";
  let mensagem = "";
  let error = false;

  const carregarUsuarios = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/usuarios`, {
        withCredentials: true,
      });
      if (response.data?.result?.usuarios) {
        usuarios.set(response.data.result.usuarios);
      } else {
        throw new Error("Estrutura de dados inesperada.");
      }
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      mensagem = "Erro ao carregar a lista de usuários.";
      error = true;
    }
  };

  const editarUsuario = async (id_usuario, dados) => {
    try {
      const response = await axios.put(
        `${apiBaseUrl}/usuarios/${id_usuario}`,
        dados,
        { withCredentials: true }
      );
      if (response.status !== 200) throw new Error("Erro ao editar usuário.");
      await carregarUsuarios();
      cancelarEdicao();
      mensagem = "Usuário atualizado com sucesso!";
      error = false;
    } catch (err) {
      console.error("Erro ao editar usuário:", err);
      mensagem = "Erro ao editar usuário.";
      error = true;
    }
  };

  const excluirUsuario = async (id_usuario) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        const response = await axios.delete(
          `${apiBaseUrl}/usuarios/${id_usuario}`,
          { withCredentials: true }
        );
        if (response.status !== 200) throw new Error("Erro ao excluir o usuário.");
        await carregarUsuarios();
        mensagem = "Usuário excluído com sucesso!";
        error = false;
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        mensagem = "Erro ao excluir usuário.";
        error = true;
      }
    }
  };

  const iniciarEdicao = (usuario) => {
    usuarioParaEditar = usuario;
    nomeEditado = usuario.nome;
    emailEditado = usuario.email;
    idadeEditada = usuario.idade;
  };

  const cancelarEdicao = () => {
    usuarioParaEditar = null;
    nomeEditado = "";
    emailEditado = "";
    idadeEditada = "";
    senhaAdm = "";
  };

  onMount(() => {
    carregarUsuarios();
  });
</script>

<HeaderAdm />

<main>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Lista de Usuários</h1>

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
            <th>Email</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {#each $usuarios as usuario}
            <tr>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.idade}</td>
              <td>
                <button
                  on:click={() => iniciarEdicao(usuario)}
                  class="btn btn-warning btn-sm me-2">
                  <img src="../../static/lapis.png" alt="Editar" style="width: 16px;" />
                </button>
                <button
                  on:click={() => excluirUsuario(usuario.id_usuario)}
                  class="btn btn-danger btn-sm">
                  <img src="../../static/trash.png" alt="Excluir" style="width: 16px;" />
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Modal para editar usuário -->
    {#if usuarioParaEditar}
      <div class="modal fade show" style="display: block;">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Editar Usuário</h5>
              <button
                type="button"
                class="btn-close"
                aria-label="Close"
                on:click={cancelarEdicao}></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="nomeEditado" class="form-label">Nome:</label>
                  <input
                    type="text"
                    id="nomeEditado"
                    bind:value={nomeEditado}
                    class="form-control"
                  />
                </div>
                <div class="mb-3">
                  <label for="emailEditado" class="form-label">Email:</label>
                  <input
                    type="email"
                    id="emailEditado"
                    bind:value={emailEditado}
                    class="form-control"
                  />
                </div>
                <div class="mb-3">
                  <label for="idadeEditada" class="form-label">Idade:</label>
                  <input
                    type="number"
                    id="idadeEditada"
                    bind:value={idadeEditada}
                    class="form-control"
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
                  editarUsuario(usuarioParaEditar.id_usuario, {
                    nome: nomeEditado,
                    email: emailEditado,
                    idade: idadeEditada,
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
  .table-responsive {
    overflow-x: auto;
  }

  .modal-dialog {
    max-width: 100%;
  }

  .btn-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    line-height: 1;
    color: #000;
  }
</style>
