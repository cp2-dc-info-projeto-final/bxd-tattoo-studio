<script>
  import {
    irParaCadastroADM,
    irParaCadastroSRC,
    administrarADM,
    administrarUser,
    administrarServico,
    administrarHora,
    irParaCadastroHora,
    paginaAtual,
  } from "../stores/navigation";

  // Controle de visibilidade das seções
  let isCollapsed = {
    Cadastros: true,
    Edições: true,
  };

  // Alterna a visibilidade dos menus
  function toggleCollapse(titulo) {
    isCollapsed[titulo] = !isCollapsed[titulo];
  }

  // Atualizar a fonte do iframe com base no valor da store
  let iframeSrc = "";
  $: {
    const mapaIframes = {
      cadastroAdm: "/CadastroADM.svelte",
      cadastroSrc: "/CadastroSRC.svelte",
      editarAdm: "/components/AdministracaoAdmins.svelte",
      editarUser: "/components/AdministracaoUsuarios.svelte",
      editarServico: "/components/AdministracaoServicos.svelte",
      editarHora: "/components/AdministracaoHorarios.svelte",
      cadastroHora: "/CadastroHora.svelte",
    };
    iframeSrc = mapaIframes[$paginaAtual] || "about:blank";
  }
</script>

<div class="container">
  <!-- Sidebar -->
  <div class="sidebar">
    <h2>Administração</h2>
    
    <!-- Menu de Cadastros -->
    <div class="nav-section">
      <div
        class="collapse-header"
        on:click={() => toggleCollapse("Cadastros")}
      >
        Cadastros
      </div>
      {#if !isCollapsed["Cadastros"]}
        <div class="collapse-content">
          <button on:click={irParaCadastroADM}>Cadastrar Admin</button>
          <button on:click={irParaCadastroSRC}>Cadastrar Serviço</button>
          <button on:click={irParaCadastroHora}>Cadastrar Horário</button>
        </div>
      {/if}
    </div>

    <!-- Menu de Edições -->
    <div class="nav-section">
      <div
        class="collapse-header"
        on:click={() => toggleCollapse("Edições")}
      >
        Edições
      </div>
      {#if !isCollapsed["Edições"]}
        <div class="collapse-content">
          <button on:click={administrarADM}>Editar Admins</button>
          <button on:click={administrarUser}>Editar Usuários</button>
          <button on:click={administrarServico}>Editar Serviços</button>
          <button on:click={administrarHora}>Editar Horários</button>
        </div>
      {/if}
    </div>
  </div>

  <!-- Main Content -->
  <div class="main-content">
    <iframe
      src={iframeSrc}
      frameborder="0"
      style="width: 100%; height: 100%;"
    ></iframe>
  </div>
</div>

<style>
  .container {
    display: flex;
    height: 100vh;
  }

  .sidebar {
    width: 250px;
    background-color: #3a3a3a;
    color: white;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
  }

  .sidebar h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .nav-section {
    margin-bottom: 15px;
  }

  .collapse-header {
    font-weight: bold;
    cursor: pointer;
    background-color: #444;
    padding: 10px;
    border-radius: 5px;
  }

  .collapse-content {
    margin-top: 5px;
    padding-left: 10px;
  }

  button {
    display: block;
    margin: 5px 0;
    width: 100%;
    background-color: #555;
    color: white;
    border: none;
    padding: 10px;
    text-align: left;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #777;
  }

  .main-content {
    flex: 1;
    padding: 10px;
  }
</style>
