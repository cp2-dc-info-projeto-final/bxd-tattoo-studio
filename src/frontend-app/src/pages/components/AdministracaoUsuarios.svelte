<script>
  import { writable } from "svelte/store";
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

    // Verifica se a estrutura de resposta é válida
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
      if (err.response && err.response.status === 409) {
        mensagem = err.response.data.message || "Conflito ao tentar editar o usuário.";
      } else {
        mensagem = "Erro ao editar usuário.";
      }
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

<div class="container mt-4">
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
              <button id="b1"
                on:click={() => iniciarEdicao(usuario)}
                class=""><img src="../../static/lapis.png"></button>
              <button id="b2"
                on:click={() => excluirUsuario(usuario.id_usuario)}
                class="btn btn-danger btn-sm"><img src="../../static/trash.png" style="size: 20px;"></button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <!-- Modal para editar usuário -->
  {#if usuarioParaEditar}
    <div class="modal fade show" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Usuário</h5>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="nomeEditado">Nome:</label>
              <input
                type="text"
                id="nomeEditado"
                bind:value={nomeEditado}
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="emailEditado">Email:</label>
              <input
                type="email"
                id="emailEditado"
                bind:value={emailEditado}
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="idadeEditada">Idade:</label>
              <input
                type="number"
                id="idadeEditada"
                bind:value={idadeEditada}
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