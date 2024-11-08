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
  import CadastroAdm from "./pages/CadastroADM.svelte";
  import LoginAdm from "./pages/LoginPrincipal.svelte";
  import HomeAdm from "./pages/HomeADM.svelte";
  import CadastroSrc from "./pages/CadastroSRC.svelte";
  import AdmnistracaoPages from "./pages/admnistracaoPages.svelte";

  let nome = "";
  let email = "";
  let senha = "";
  let idade = "";
  let conf_senha = "";
  let usuarios = null;
  let colunas_usuarios = null;
  let mensagem = "";
  let error = false;
  let resultado = null;
</script>

{#if $paginaAtual === "home"}
  <Home {irParaLogin} {irParaCadastro} />
{/if}

{#if $paginaAtual === "login"}
  <Login
    {email}
    {senha}
    {error}
    {usuarios}
    {colunas_usuarios}
    {mensagem}
    {resultado}
  />
{/if}

{#if $paginaAtual === "cadastro"}
  <Cadastro {nome} {email} {idade} {senha} {conf_senha} {error} {resultado} />
{/if}

{#if $paginaAtual === "agendamento"}
  <Agendamento />
{/if}

{#if $paginaAtual === "cadadm"}
  <CadastroAdm />
{/if}

{#if $paginaAtual === "loginadm"}
  <LoginAdm />
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

