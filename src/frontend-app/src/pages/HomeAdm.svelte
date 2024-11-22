<script>
    import { administrarADM } from "../stores/navigation";
    import { administrarUser } from "../stores/navigation";
    import { administrarServico } from "../stores/navigation";
    import { paginaAtual } from "../stores/navigation";
</script>

<main>
  <button on:click={administrarADM} class="btn btn-success w-100">ir para admnistração de adms</button>
  <button on:click={administrarUser} class="btn btn-success w-100">ir para admnistração de usuarios</button>
  <button on:click={administrarServico} class="btn btn-success w-100">ir para admnistração de serviços</button>
</main>