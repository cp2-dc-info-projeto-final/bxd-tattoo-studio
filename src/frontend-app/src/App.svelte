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
  } from "./stores/navigation";
  import Home from "./pages/Home.svelte";
  import Login from "./pages/Login.svelte";
  import Cadastro from "./pages/Cadastro.svelte";
  import Agendamento1 from "./pages/Agendamento/Agendamento1.svelte";
  import Agendamento2 from "./pages/Agendamento/Agendamento2.svelte";
  import Agendamento3 from "./pages/Agendamento/Agendamento3.svelte";
  import AdministracaoAdmins from "./pages/components/AdministracaoAdmins.svelte";
  import AdministracaoUsuarios from "./pages/components/AdministracaoUsuarios.svelte";
  import AdministracaoServicos from "./pages/components/AdministracaoServicos.svelte";
  import AdministracaoHora from "./pages/components/AdministracaoServicos.svelte";
  import HomeAdm from "./pages/HomeAdm.svelte";
  import CadastroSrc from "./pages/CadastroSRC.svelte";
  import AdmnistracaoPages from "./pages/admnistracaoPages.svelte";
  import CadastroHora from "./pages/CadastroHora.svelte";
  import CadastroAdm from "./pages/CadastroADM.svelte";
</script>

{#if $paginaAtual === "home"}
  <Home />
{:else if $paginaAtual === "login"}
  <Login />
{:else if $paginaAtual === "cadastro"}
  <Cadastro />
{:else if $paginaAtual === "agendamento"}
  <Agendamento1 />
{:else if $paginaAtual === "homeadm"}
  <HomeAdm />
{:else if $paginaAtual === "adm"}
  <AdmnistracaoPages />
{:else if $paginaAtual === "admadm"}
  <AdministracaoAdmins />
{:else if $paginaAtual === "admuser"}
  <AdministracaoUsuarios />
  {:else if $paginaAtual === "admservico"}
  <AdministracaoServicos />
{:else if $paginaAtual === "admhora"}
  <AdministracaoHora />
{:else if $paginaAtual === "cadsrc"}
  <CadastroSrc />
{:else if $paginaAtual === "cadadm"}
  <CadastroAdm />
{:else if $paginaAtual === "cadhora"}
  <CadastroHora />
  {:else if $paginaAtual === "ag1"}
  <Agendamento1 />
{:else if $paginaAtual === "ag2"}
  <Agendamento2 />
{:else if $paginaAtual === "ag3"}
  <Agendamento3 />
{/if}
