<script>
  import {
    administrarADM,
    administrarUser,
    administrarServico,
    irParaCadastroADM,
    irParaCadastroSRC,
  } from "../stores/navigation";

  // Opções de navegação
  let opcoes = [
    {
      titulo: "Cadastros",
      itens: [
        { nome: "Administradores", acao: irParaCadastroADM },
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

  // Variáveis para controlar os collapses
  let isCollapsed = {
    "Cadastros": false,
    "Edições": false
  };

  // Garantia de que ações retornem void explicitamente
  function handleAction(acao) {
    acao();
  }

  // Função para alternar a visibilidade de um collapse
  function toggleCollapse(titulo) {
    isCollapsed[titulo] = !isCollapsed[titulo];
  }
</script>

<style>
  .container {
    display: flex;
  }

  .sidebar {
    width: 250px;
    background-color: #3a3a3a;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  }

  .main-content {
    margin-left: 270px;
    padding: 20px;
  }

  .nav-section {
    margin-bottom: 15px;
  }

  .nav-item {
    width: 100%;
    padding: 10px;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    font-size: 16px;
    color: #222020;
    transition: background-color 0.3s;
  }

  .collapse-header {
    cursor: pointer;
    background-color: #222020;
    color: white;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 5px;
  }

  .collapse-header:hover {
    background-color: #0056b3;
  }

  .collapse-content {
    padding-left: 15px;
  }
</style>

<div class="container">
  <!-- Sidebar -->
  <div class="sidebar">
    <h4>Administração</h4>
    {#each opcoes as opcao}
      <div class="nav-section">
        <div
          class="collapse-header"
          on:click={() => toggleCollapse(opcao.titulo)}
        >
          {opcao.titulo}
        </div>
        {#if !isCollapsed[opcao.titulo]}
          <div class="collapse-content">
            {#each opcao.itens as item}
              <button
                class="nav-item"
                on:click={() => handleAction(item.acao)}
              >
                {item.nome}
              </button>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <!-- Main Content -->
  <div class="main-content">
    <h3>Bem-vindo à administração!</h3>
    <p>Selecione uma opção no menu para começar.</p>
  </div>
</div>
