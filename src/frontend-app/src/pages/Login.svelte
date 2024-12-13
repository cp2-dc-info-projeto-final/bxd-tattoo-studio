<script>
  import { sessionStore } from "../stores/session";
  import { irParaHome, irParaCadastro, irParaHomeADM } from "../stores/navigation";
  import { api_base_url } from "../stores/navigation";

  let userOrEmail = "";
  let senha = "";
  let error = false;
  let mensagem = "";
  let resultado = null;

  const fazerLogin = async () => {
    try {
      const res = await fetch(`${api_base_url}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userOrEmail, senha }),
        credentials: 'include',
      });

      const data = await res.json();

      if (res.ok) {
        resultado = { message: "Login bem-sucedido!" };
        error = false;
        mensagem = "";

        sessionStore.set(data.token);

        userOrEmail = "";
        senha = "";

        if (data.role === "admin") {
          irParaHomeADM();
        } else {
          irParaHome();
        }
      } else {
        resultado = null;
        error = true;
        mensagem = data.message || "Erro ao fazer login.";
      }
    } catch (err) {
      error = true;
      mensagem = "Erro de conexão. Tente novamente.";
    }
  };
</script>

<main class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-12 col-md-6">
      <h2 class="text-center mb-4">Login</h2>
      <form class="row g-3" on:submit|preventDefault={fazerLogin}>
        <div class="col-12">
          <label for="userOrEmail" class="form-label">Usuário ou Email</label>
          <input 
            type="text" 
            id="userOrEmail" 
            bind:value={userOrEmail} 
            class="form-control" 
            placeholder="Digite seu login" 
            required 
          />
        </div>
        <div class="col-12">
          <label for="senha" class="form-label">Senha</label>
          <input 
            type="password" 
            id="senha" 
            bind:value={senha} 
            class="form-control" 
            placeholder="Digite sua senha" 
            required 
          />
        </div>
        <div class="col-12 text-center">
          <button type="submit" class="btn btn-primary w-100">Entrar</button>
        </div>
      </form>
      <p class="text-center mt-3">Não possui cadastro?</p>
      <button class="btn btn-link p-0 w-100 text-primary text-decoration-underline" on:click={irParaCadastro}>Cadastre-se</button>

      {#if error}
        <div class="alert alert-danger mt-3">{mensagem}</div>
      {/if}
      {#if resultado && resultado.message}
        <div class="alert alert-success mt-3">{resultado.message}</div>
      {/if}
    </div>
  </div>
</main>

<style>
  main {
    max-width: 100%;
    margin: auto;
    padding: 15px;
  }

  @media (min-width: 768px) {
    main {
      max-width: 600px;
    }
  }
</style>
