<script>
    import { irParaLogin, irParaLoginADM } from "../stores/navigation";
    import { onMount } from "svelte";
    import { writable } from 'svelte/store';
    import axios from "axios";

    const usuarios = writable([]);
    const adm = writable({});
    let usuarioParaEditar = null;
    let nomeEditado = '';
    let emailEditado = '';
    let idadeEditada = '';
    let senhaAdm = '';

    // Função para carregar a lista de usuários
    const carregarUsuarios = async () => {
        try {
            const response = await fetch('http://localhost:3000/usuarios', {
                method: 'GET',
                credentials: 'include', // Inclui o cookie na requisição
            });
            const data = await response.json();
            usuarios.set(data.usuarios); // Atualiza o store com a lista de usuários
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
        }
    };

  // Função de logout
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/logout",
        {},
        { withCredentials: true },
      );
      alert("Logout realizado com sucesso!");
      irParaLogin(); // Redireciona para a página de login
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
      alert("Erro ao realizar logout.");
    }
  };

    // Função para pegar dados do administrador logado
    const pegaDadosADM = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/adms/me', {
                method: 'GET',
                credentials: 'include', // Inclui o cookie na requisição
            });
            adm.set(await response.json()); // Armazena os dados do administrador logado
        } catch (error) {
            console.error('Erro ao pegar dados do administrador:', error);
        }
    };

    // Função para iniciar a edição de um usuário
    const iniciarEdicao = (usuario) => {
        usuarioParaEditar = usuario;
        nomeEditado = usuario.nome;
        emailEditado = usuario.email;
        idadeEditada = usuario.idade;
    };

    // Função para cancelar a edição
    const cancelarEdicao = () => {
        usuarioParaEditar = null;
        nomeEditado = '';
        emailEditado = '';
        idadeEditada = '';
    };

    // Função para editar um usuário
    const editarUsuario = async (id_usuario, dados) => {
        try {
            const response = await fetch(`http://localhost:3000/usuarios/${id_usuario}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            });

            if (!response.ok) throw new Error('Erro ao editar usuário.');
            await carregarUsuarios(); // Recarrega a lista de usuários
            cancelarEdicao(); // Cancela a edição
        } catch (error) {
            console.error('Erro ao editar usuário:', error);
        }
    };

    // Função para excluir um usuário
    const excluirUsuario = async (id_usuario) => {
        if (confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                const response = await fetch(`http://localhost:3000/usuarios/${id_usuario}`, {
                    method: 'DELETE',
                    credentials: 'include',
                });
                if (!response.ok) throw new Error('Erro ao excluir usuário.');
                await carregarUsuarios(); // Recarrega a lista de usuários
            } catch (error) {
                console.error('Erro ao excluir usuário:', error);
            }
        }
    };

    // Executa quando o componente é montado
    onMount(() => {
        carregarUsuarios(); // Carrega a lista de usuários ao iniciar
        pegaDadosADM(); // Obtém os dados do administrador logado
    });
</script>

<h1>Bem-vindo, {$adm.nome}</h1>

<button on:click={logout} class="btn btn-danger">Logout</button>

<h2>Lista de Usuários</h2>
{#if $usuarios && $usuarios.length > 0}
    <table class="table table-striped">
        <thead>
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
                        <button on:click={() => iniciarEdicao(usuario)} class="btn btn-primary">Editar</button>
                        <button on:click={() => excluirUsuario(usuario.id_usuario)} class="btn btn-danger">Excluir</button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
{/if}

{#if usuarioParaEditar}
    <div class="modal fade show" style="display: block;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Editar Usuário</h5>
                    <button type="button" class="close" aria-label="Close" on:click={cancelarEdicao}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <label>Nome:</label>
                    <input type="text" bind:value={nomeEditado} class="form-control" />
                    <label>Email:</label>
                    <input type="text" bind:value={emailEditado} class="form-control" />
                    <label>Idade:</label>
                    <input type="number" bind:value={idadeEditada} class="form-control" />
                    <label>Senha ADM:</label>
                    <input type="password" bind:value={senhaAdm} class="form-control" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" on:click={cancelarEdicao}>Cancelar</button>
                    <button type="button" class="btn btn-success" on:click={() => editarUsuario(usuarioParaEditar.id_usuario, { nome: nomeEditado, email: emailEditado, idade: idadeEditada, senha: senhaAdm })}>Salvar</button>
                </div>
            </div>
        </div>
    </div>
{/if}