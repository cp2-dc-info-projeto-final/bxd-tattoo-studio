<script>
  import {
    irParaCadastroADM,
    irParaCadastroSRC,
    irParaCadastroHora,
    irParaHomeADM,
    administrarADM,
    administrarUser,
    administrarServico,
    administrarHora,
  } from "../../stores/navigation";
</script>

<header class="p-3 bg-dark text-white">
  <div class="container">
    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
      <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
        <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
          <use xlink:href="#bootstrap"></use>
        </svg>
      </a>

      <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        <li><a href="#" class="nav-link px-2 text-secondary" on:click={irParaHomeADM}>Home</a></li>
      </ul>

      <!-- Dropdown for Cadastro Options -->
      <div class="dropdown me-2">
        <button
          class="btn btn-outline-light dropdown-toggle"
          type="button"
          id="cadastroDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false">
          Opções Cadastro
        </button>
        <ul class="dropdown-menu" aria-labelledby="cadastroDropdown">
          <li><a class="dropdown-item" href="#" on:click={irParaCadastroADM}>Cadastro de Administradores</a></li>
          <li><a class="dropdown-item" href="#" on:click={irParaCadastroSRC}>Cadastro de Serviços</a></li>
          <li><a class="dropdown-item" href="#" on:click={irParaCadastroHora}>Cadastro de Horários</a></li>
        </ul>
      </div>

      <!-- Dropdown for Administração Options -->
      <div class="dropdown">
        <button
          class="btn btn-outline-light dropdown-toggle"
          type="button"
          id="administracaoDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false">
          Opções Administração
        </button>
        <ul class="dropdown-menu" aria-labelledby="administracaoDropdown">
          <li><a class="dropdown-item" href="#" on:click={administrarADM}>Administrar Administradores</a></li>
          <li><a class="dropdown-item" href="#" on:click={administrarUser}>Administrar Usuários</a></li>
          <li><a class="dropdown-item" href="#" on:click={administrarServico}>Administrar Serviços</a></li>
          <li><a class="dropdown-item" href="#" on:click={administrarHora}>Administrar Horários</a></li>
        </ul>
      </div>
    </div>
  </div>
</header>
