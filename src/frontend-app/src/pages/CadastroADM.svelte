<script>
  import { onMount } from 'svelte';
  import { irParaHomeADM } from '../stores/navigation.js';
  import axios from 'axios';
  
  let nome = '';
  let email = '';
  let senha = '';
  let idade = '';
  let erro = '';
  
  const cadastrarAdm = async () => {
    try {
      const response = await axios.post('/usuarios/novo', {
        nome,
        email,
        senha,
        idade
      });
      alert('Administrador cadastrado com sucesso!');
      irParaHomeADM();
    } catch (err) {
      erro = 'Erro ao cadastrar administrador. Tente novamente.';
      console.error(err);
    }
  };
</script>

<main>
  <h2>Cadastrar Administrador</h2>
  <form on:submit|preventDefault={cadastrarAdm}>
    <div>
      <label for="nome">Nome:</label>
      <input type="text" id="nome" bind:value={nome} required />
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" bind:value={email} required />
    </div>
    <div>
      <label for="senha">Senha:</label>
      <input type="password" id="senha" bind:value={senha} required />
    </div>
    <div>
      <label for="idade">Idade:</label>
      <input type="number" id="idade" bind:value={idade} required />
    </div>
    <button type="submit">Cadastrar</button>
  </form>
  {#if erro}
    <p>{erro}</p>
  {/if}
</main>
