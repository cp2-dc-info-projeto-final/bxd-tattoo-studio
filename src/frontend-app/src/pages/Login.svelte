<script>
  import { sessionStore } from "../stores/session"; // Para armazenar o token
  import { irParaHome, irParaCadastro, irParaCadastroADM, irParaLoginADM} from "../stores/navigation"; // Para redirecionar
  import { api_base_url } from "../stores/navigation"; // Base da URL da API

  let email = "";
  let senha = "";
  let error = false;
  let mensagem = "";
  let resultado = null;

  // Função para fazer login
  const fazerLogin = async () => {
    try {
      const res = await fetch(`${api_base_url}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
        credentials: 'include' // Importante para que cookies de sessão JWT sejam enviados e recebidos
      });

      // Tratamento da resposta
      const data = await res.json();
      if (res.ok) {
        resultado = { message: "Login bem-sucedido!" };
        error = false;
        mensagem = ""; // Limpa a mensagem de erro
        sessionStore.set(data.token); // Armazena o token JWT no sessionStore
        email = "";
        senha = "";
        irParaHome(); // Redireciona para a página inicial
      } else {
        resultado = null;
        error = true;
        mensagem = data.error || data.message || "Erro ao fazer login.";
      }
    } catch (err) {
      error = true;
      mensagem = "Erro de conexão. Tente novamente.";
      console.error("Erro de conexão:", err); // Log do erro para debug
    }
  };
</script>

<main>
  <div class="container mt-5">
    <div class="row justify-content-center m-auto align-items-center d-flex" style="width: 600px; padding-top: 100px; padding-bottom: 100px;">
      <div class="col-md-5">
        <h2 class="text-center mb-4">Login</h2>
        <form on:submit|preventDefault={fazerLogin}>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" bind:value={email} placeholder="Digite seu email" required />
          </div>
          <div class="mb-3">
            <label for="senha" class="form-label">Senha</label>
            <input type="password" class="form-control" id="senha" bind:value={senha} placeholder="Digite sua senha" required />
          </div>
          <button type="submit" class="btn btn-success w-100">Entrar</button>
        </form>
        <p class="fs-5 pt-">Não possui cadastro?</p>
        <button on:click={irParaCadastro} class="btn btn-success w-100">Cadastre-se</button>
        <p class="fs-5 pt-">Logar ADM?</p>
        <button on:click={irParaLoginADM} class="btn btn-success w-100">Logar ADM</button>
        {#if error}
          <p style="color: red;">{mensagem}</p>
        {/if}
        {#if resultado && resultado.message}
          <p style="color: green;">{resultado.message}</p>
        {/if}
      </div>
    </div>
  </div>
</main>
