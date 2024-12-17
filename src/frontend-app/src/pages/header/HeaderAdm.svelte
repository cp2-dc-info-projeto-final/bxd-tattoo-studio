<script>
  import axios from "axios";
  import {
    irParaCadastroADM,
    irParaCadastroSRC,
    irParaCadastroHora,
    irParaHomeADM,
    administrarADM,
    administrarUser,
    administrarServico,
    administrarHora,
    irParaLogin,
  } from "../../stores/navigation";

  async function fazerLogout() {
    try {
      // Enviando a requisição de logout com Axios
      const response = await axios.post('/api/logout', {}, { withCredentials: true });

      if (response.status === 200) {
        console.log(response.data.message); // Exibe a mensagem de logout bem-sucedido
        irParaLogin(); // Redireciona para a página de login
      } else {
        console.error('Erro ao fazer logout.', response);
      }
    } catch (error) {
      console.error('Erro ao se conectar à API:', error);
    }
  }
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
        <li><a href="#" class="nav-link px-2 text-secondary" on:click={irParaHomeADM}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0,0,256,256">
          <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M25,1.05078c-0.2175,0 -0.43414,0.06898 -0.61914,0.20898l-23,17.95117c-0.43,0.34 -0.50992,0.9682 -0.16992,1.4082c0.34,0.43 0.9682,0.50992 1.4082,0.16992l1.38086,-1.07812v26.28906c0,0.55 0.45,1 1,1h14v-18h12v18h14c0.55,0 1,-0.45 1,-1v-26.28906l1.38086,1.07812c0.19,0.14 0.39914,0.21094 0.61914,0.21094c0.3,0 0.58906,-0.13086 0.78906,-0.38086c0.34,-0.44 0.26008,-1.0682 -0.16992,-1.4082l-23,-17.95117c-0.185,-0.14 -0.40164,-0.20898 -0.61914,-0.20898zM35,5v1.05078l6,4.67969v-5.73047z"></path></g></g>
          </svg></a></li>
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
