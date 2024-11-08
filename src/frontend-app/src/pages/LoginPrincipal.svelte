<script>
  import { irParaHome, irParaCadastro } from "../stores/navigation";
  import { setSession } from "../stores/session";
  import axios from "axios";

  let email = "";
  let senha = "";
  let error = false;
  let mensagem = "";

  const login = async () => {
    try {
      const response = await axios.post('/api/login', { emailOrUser: email, senha });
      setSession(response.data.token);
      irParaHome(); // Redireciona para a página inicial
    } catch (err) {
      error = true;
      mensagem = err.response.data.message;
    }
  };
</script>

<div>
  <h2>Login</h2>
  {#if error}
    <p>{mensagem}</p>
  {/if}
  <input type="email" bind:value={email} placeholder="Email ou Usuário" />
  <input type="password" bind:value={senha} placeholder="Senha" />
  <button on:click={login}>Entrar</button>
  <button on:click={irParaCadastro}>Cadastro</button>
</div>
