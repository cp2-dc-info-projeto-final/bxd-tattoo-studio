<script>
  import { irParaLogin } from "../stores/navigation";
  import axios from "axios";

  let admData = {};
  let nome = "";
  let email = "";
  let senha = "";
  let adms = [];

  // Função para verificar se o administrador está logado
  const verificaAdmLogado = async () => {
    const response = await fetch("http://localhost:3000/api/adms/me", {
      method: "GET",
      credentials: "include",
    });

    if (response.status !== 200) {
      irParaLogin(); // Redireciona para a página de login se não estiver logado
    } else {
      admData = await response.json();
    }
  };

  // Função para cadastrar um novo administrador
  const cadastrarAdm = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/adms/novo",
        { nome, email, senha },
        { withCredentials: true }
      );

      if (response.status === 201) {
        alert("Administrador cadastrado com sucesso!");
        carregarAdms(); // Atualiza a lista de administradores
      }
    } catch (error) {
      console.error("Erro ao cadastrar administrador:", error);
      alert("Erro ao cadastrar administrador.");
    }
  };

  // Função para carregar a lista de administradores
  const carregarAdms = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/adms", {
        withCredentials: true,
      });

      if (response.status === 200) {
        adms = response.data;
      }
    } catch (error) {
      console.error("Erro ao carregar administradores:", error);
      alert("Erro ao carregar administradores.");
    }
  };

  // Chama a verificação de login ao carregar o componente
  verificaAdmLogado();
  carregarAdms();
</script>

<div class="container mt-5">
  <h1>Cadastro de Administradores</h1>

  <form on:submit|preventDefault={cadastrarAdm}>
    <div class="mb-3">
      <label for="nome" class="form-label">Nome</label>
      <input
        type="text"
        class="form-control"
        id="nome"
        bind:value={nome}
        required
      />
    </div>

    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input
        type="email"
        class="form-control"
        id="email"
        bind:value={email}
        required
      />
    </div>

    <div class="mb-3">
      <label for="senha" class="form-label">Senha</label>
      <input
        type="password"
        class="form-control"
        id="senha"
        bind:value={senha}
        required
      />
    </div>

    <button type="submit" class="btn btn-primary">Cadastrar Administrador</button>
  </form>

  <h2 class="mt-5">Lista de Administradores</h2>
  <ul>
    {#each adms as adm}
      <li>{adm.nome} - {adm.email}</li>
    {/each}
  </ul>
</div>
