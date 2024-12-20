<script>
  import axios from 'axios';
  import { sessionStore } from "../../stores/session"; // Importa o store de sessão
  import {
    irParaCadastroADM,
    irParaCadastroSRC,
    irParaCadastroHora,
    irParaLogin,
    irParaHome,
  } from "../../stores/navigation";
  
  async function teste() {
    console.log("oi")
  }
  async function fazerLogout() {
    try {
      const response = await axios.post('http://localhost:3000/api/logout', {}, {
        withCredentials: true, // Inclui os cookies na requisição
      });

      if (response.status === 200) {
        console.log(response.data.message); // Exibe a mensagem de logout bem-sucedido
        
        // Limpar a sessão e o role do store
        sessionStore.set(null); // Limpa a sessão e o role

        // Redireciona para a página de login
        irParaLogin();
      } else {
        console.error('Erro ao fazer logout.');
      }
    } catch (error) {
      if (error.response) {
        // O servidor respondeu com um status fora do intervalo 2xx
        console.error('Erro na resposta da API:', error.response.data.message || error.response.status);
      } else if (error.request) {
        // Nenhuma resposta foi recebida
        console.error('Nenhuma resposta da API:', error.request);
      } else {
        // Outro erro durante a configuração da solicitação
        console.error('Erro ao configurar a requisição:', error.message);
      }
    }
  }
</script>

<header>
  <div class="navbar navbar-dark bg-dark shadow-sm">
    <div class="container d-flex justify-content-between align-items-center">
      <!-- Logo (Canto Esquerdo) -->
      <a
        href="#"
        class="navbar-brand d-flex align-items-center"
        on:click={irParaHome}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="32"
          height="32"
          viewBox="0,0,256,256"
        >
          <g
            fill="#ffffff"
            fill-rule="nonzero"
            stroke="none"
            stroke-width="1"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            stroke-miterlimit="10"
            stroke-dasharray=""
            stroke-dashoffset="0"
            font-family="none"
            font-weight="none"
            font-size="none"
            text-anchor="none"
            style="mix-blend-mode: normal"
          >
            <g transform="scale(5.12,5.12)">
              <path
                d="M25,1.05078c-0.2175,0 -0.43414,0.06898 -0.61914,0.20898l-23,17.95117c-0.43,0.34 -0.50992,0.9682 -0.16992,1.4082c0.34,0.43 0.9682,0.50992 1.4082,0.16992l1.38086,-1.07812v26.28906c0,0.55 0.45,1 1,1h14v-18h12v18h14c0.55,0 1,-0.45 1,-1v-26.28906l1.38086,1.07812c0.19,0.14 0.39914,0.21094 0.61914,0.21094c0.3,0 0.58906,-0.13086 0.78906,-0.38086c0.34,-0.44 0.26008,-1.0682 -0.16992,-1.4082l-23,-17.95117c-0.185,-0.14 -0.40164,-0.20898 -0.61914,-0.20898zM35,5v1.05078l6,4.67969v-5.73047z"
              ></path>
            </g>
          </g>
        </svg>
      </a>

      <!-- Links Centrais -->
      <div class="d-flex justify-content-center align-items-center">
        <a href="#" class="text-white text-decoration-none mx-3">Home</a>
        <a href="#" class="text-white text-decoration-none mx-3">About</a>
        <a href="#" class="text-white text-decoration-none mx-3">Contact</a>
      </div>

      <!-- Menu Suspenso (Canto Direito) -->
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Menu
        </button>
        <ul
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="dropdownMenuButton"
        >
          <a
            class="dropdown-item"
            href="#"
            on:click|preventDefault={fazerLogout}
          >
            Fazer Logout
          </a>
          <li>
            <a class="dropdown-item" href="#" on:click={teste}
              >Editar Perfil</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</header>