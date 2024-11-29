<script>
  import {
    administrarADM,
    administrarUser,
    administrarServico,
    irParaCadastroADM,
    irParaCadastroSRC,
  } from "../stores/navigation";

  let opcoes = [
    {
      titulo: "Cadastros",
      itens: [
        { nome: "Administradores", acao: irParaCadastroADM() },
        { nome: "Serviços", acao: irParaCadastroSRC },
      ],
    },
    {
      titulo: "Edições",
      itens: [
        { nome: "Administradores", acao: administrarADM },
        { nome: "Usuários", acao: administrarUser },
        { nome: "Serviços", acao: administrarServico },
      ],
    },
  ];

  // Garantia de que ações retornem void explicitamente
  function handleAction(acao) {
    acao();
  }
</script>

<style>
  .sidebar {
    background-color: #2c2c2c;
    color: #e0e0e0;
    height: 100vh;
    padding: 20px;
    position: sticky;
    top: 0;
    overflow-y: auto;
  }

  .sidebar h4 {
    margin-bottom: 20px;
  }

  .sidebar .nav-section {
    margin-bottom: 30px;
  }

  .sidebar .nav-item {
    color: #e0e0e0;
    margin: 5px 0;
    display: block;
    background: none;
    border: none;
    text-align: left;
    font-size: 16px;
    cursor: pointer;
    padding: 8px 0;
  }

  .sidebar .nav-item:hover {
    color: #17a2b8;
  }

  .main-content {
    padding: 20px;
    flex-grow: 1;
  }

  .container {
    display: flex;
  }

  @media (max-width: 768px) {
    .sidebar {
      position: static;
      height: auto;
    }
  }
</style>

<div class="container">
  <!-- Sidebar -->
  <div class="sidebar">
    <h4>Administração</h4>
    {#each opcoes as opcao}
      <div class="nav-section">
        <h5>{opcao.titulo}</h5>
        {#each opcao.itens as item}
          <!-- Botão interativo para evitar problemas de acessibilidade -->
          <button class="nav-item"
           on:click={administrarServico}
          >
            {item.nome}
          </button>
        {/each}
      </div>
    {/each}
  </div>

  <!-- Main Content -->
  <div class="main-content">
    <h3>Bem-vindo à administração!</h3>
    <p>Selecione uma opção no menu para começar.</p>
  </div>
</div>
