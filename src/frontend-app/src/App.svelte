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
    irParaLoginADM
  } from "./stores/navigation";
  import Home from "./pages/Home.svelte";
  import Login from "./pages/Login.svelte";
  import Cadastro from "./pages/Cadastro.svelte";
  import Agendamento from "./pages/Agendamento.svelte";
  import AdministracaoAdmins from "./pages/components/AdministracaoAdmins.svelte";
  import AdministracaoUsuarios from "./pages/components/AdministracaoUsuarios.svelte";
  import AdministracaoServicos from "./pages/components/AdministracaoServicos.svelte";
  import HomeAdm from "./pages/HomeAdm.svelte";
  import CadastroSrc from "./pages/CadastroSRC.svelte";
  import AdmnistracaoPages from "./pages/admnistracaoPages.svelte";
</script>

{#if $paginaAtual === "home"}
  <Home />
{/if}

{#if $paginaAtual === "login"}
  <Login />
{/if}

{#if $paginaAtual === "cadastro"}
  <Cadastro />
{/if}

{#if $paginaAtual === "agendamento"}
  <Agendamento />
{/if}

{#if $paginaAtual === "cadadm"}
  <CadastrarAdmin />
{/if}

{#if $paginaAtual === "homeadm"}
  <HomeAdm />
{/if}

{#if $paginaAtual === "cadsrc"}
  <CadastroSrc />
{/if}

{#if $paginaAtual === "adm"}
  <AdmnistracaoPages />
{/if}

{#if $paginaAtual === "admadm"}
  <AdministracaoAdmins />
{/if}

{#if $paginaAtual === "admuser"}
  <AdministracaoUsuarios />
{/if}

{#if $paginaAtual === "admservico"}
  <AdministracaoServicos />
{/if}

