<!-- src/components/Home.svelte -->
<script>
  import { irParaLogin } from "../stores/navigation";
  import HeaderUser from "./header/HeaderUser.svelte";
  import { irParaAgendamento } from "../stores/navigation";
  import { irParaCadastro } from "../stores/navigation";
  import { irParaHome } from "../stores/navigation";
  import { api_base_url } from "../stores/navigation";
</script>

<HeaderUser />
<main>
<div class="container mt-5">
  <div class="jumbotron text-center">
    <h1 class="display-4">Bem-vindo ao BXD-TATTOO</h1>
    <p class="lead">Explore o estúdio e conheça nosso trabalho.</p>
    <button class="btn btn-primary" on:click={irParaAgendamento}>Agendamento</button>
  </div>
</div>
</main>