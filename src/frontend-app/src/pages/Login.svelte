<script>
//Login.svelte  
  import { sessionStore } from "../stores/session"; // Para armazenar o token
  import { irParaHome, irParaCadastro, irParaHomeADM } from "../stores/navigation"; // Para redirecionar
  import { api_base_url } from "../stores/navigation"; // Base da URL da API

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
    console.log("Resposta da API:", data); // Log completo da resposta para depuração

    if (res.ok) {
      resultado = { message: "Login bem-sucedido!" };
      error = false;
      mensagem = "";

      sessionStore.set(data.token);

      userOrEmail = "";
      senha = "";

      if (data.role === "admin") {
        alert("Usuário é administrador. Redirecionando para home do admin.");
        irParaHomeADM();
      } else if (data.role === "user") {
        alert("Usuário é regular. Redirecionando para home.");
        irParaHome();
      } else {
        alert("Role não reconhecido. Redirecionando para home padrão.");
        irParaHome(); // Fallback para home padrão
      }
    } else {
      console.error("Erro no login:", data.message || "Erro desconhecido");
      resultado = null;
      error = true;
      mensagem = data.message || "Erro ao fazer login.";
    }
  } catch (err) {
    console.error("Erro de conexão:", err);
    error = true;
    mensagem = "Erro de conexão. Tente novamente.";
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
            <label for="userOrEmail" class="form-label">userOrEmail</label>
            <input type="text" class="form-control" id="userOrEmail" bind:value={userOrEmail} placeholder="Digite seu login" required />
          </div>
          <div class="mb-3">
            <label for="senha" class="form-label">Senha</label>
            <input type="password" class="form-control" id="senha" bind:value={senha} placeholder="Digite sua senha" required />
          </div>
          <button type="submit" class="btn btn-success w-100">Entrar</button>
        </form>
        <p class="fs-5 pt-">Não possui cadastro?</p>
        <button on:click={irParaCadastro} class="btn btn-success w-100">Cadastre-se</button>
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
