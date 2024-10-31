<script>
  import {
    paginaAtual,
    irParaLogin,
    irParaCadastro,
    irParaHome,
    irParaAgendamento,
    irParaCadastroADM,
    irParaCadastroSRC,
    irParaHomeADM,
    irParaLoginADM,
  } from "../stores/navigation";
    import Agendamento from "./Agendamento.svelte";
    import Cadastro from "./Cadastro.svelte";
    import CadastroAdm from "./CadastroADM.svelte";
</script>

<div class="m-5">
<button class="btn btn-primary mr-2" on:click={irParaCadastro}>Cadastro</button>
<button class="btn btn-primary mr-2" on:click={irParaHome}>Home</button>
<button class="btn btn-primary mr-2" on:click={irParaLogin}>Login</button>
<button class="btn btn-primary mr-2" on:click={irParaAgendamento}>Agendamento</button>
<button class="btn btn-primary mr-2" on:click={irParaCadastroADM}>CadastroAdm</button>
<button class="btn btn-primary mr-2" on:click={irParaCadastroSRC}>Cadastro de Serviços</button>
<button class="btn btn-primary mr-2" on:click={irParaHomeADM}>Home ADM</button>
<button class="btn btn-primary mr-2" on:click={irParaLoginADM}>Login ADM</button>
</div>