<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
    import { irParaCadastro } from '../stores/navigation.js';
    
    let admins = [];
  
    const carregarAdms = async () => {
      try {
        const response = await axios.get('/usuarios');
        admins = response.data;
      } catch (err) {
        console.error('Erro ao carregar administradores:', err);
      }
    };
  
    onMount(() => {
      carregarAdms();
    });
  </script>
  
  <main>
    <h2>Lista de Administradores</h2>
    <button on:click={irParaCadastroADM}>Cadastrar Novo</button>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Idade</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {#each admins as adm}
          <tr>
            <td>{adm.id_usuario}</td>
            <td>{adm.nome}</td>
            <td>{adm.email}</td>
            <td>{adm.idade}</td>
            <td><button>Editar</button><button>Excluir</button></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </main>
  