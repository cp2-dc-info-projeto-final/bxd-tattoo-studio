<script>
  import { sessionStore } from "../stores/session"; // Importe o sessionStore
  import { onMount } from "svelte";
  import HeaderAdm from "./header/HeaderAdm.svelte";
  import axios from "axios";
  import { api_base_url } from "../stores/navigation"; // Ajuste o caminho conforme necessário

  let tamanho = 0;
  let complexidade = "";
  let cores = "";
  let precoBase = 0;
  let error = null;
  let resultado = null;

  function calcularPrecoTatuagem() {
    let tamanhoClassificado;
    if (tamanho <= 5) {
      tamanhoClassificado = "pequeno";
    } else if (tamanho > 5 && tamanho <= 15) {
      tamanhoClassificado = "medio";
    } else {
      tamanhoClassificado = "grande";
    }

    if (tamanhoClassificado === "pequeno") {
      if (complexidade === "simples" && cores === "unicolor") {
        precoBase = 350;
      } else if (complexidade === "complexa" && cores === "unicolor") {
        precoBase = 450;
      } else if (complexidade === "simples" && cores === "multicolor") {
        precoBase = 450;
      } else if (complexidade === "complexa" && cores === "multicolor") {
        precoBase = 600;
      }
    } else if (tamanhoClassificado === "medio") {
      if (complexidade === "simples" && cores === "unicolor") {
        precoBase = 950;
      } else if (complexidade === "complexa" && cores === "unicolor") {
        precoBase = 1000;
      } else if (complexidade === "simples" && cores === "multicolor") {
        precoBase = 1000;
      } else if (complexidade === "complexa" && cores === "multicolor") {
        precoBase = 1250;
      }
    } else if (tamanhoClassificado === "grande") {
      if (complexidade === "simples" && cores === "unicolor") {
        precoBase = 1250;
      } else if (complexidade === "complexa" && cores === "unicolor") {
        precoBase = 1350;
      } else if (complexidade === "simples" && cores === "multicolor") {
        precoBase = 1350;
      } else if (complexidade === "complexa" && cores === "multicolor") {
        precoBase = 1500;
      }
    }

    if (!tamanhoClassificado || !complexidade || !cores || !precoBase) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    cadastrarServico(tamanhoClassificado, complexidade, cores, precoBase);
  }

  const cadastrarServico = async (tamanho, complexidade, cores, preco) => {
    const token = $sessionStore;
    if (!token) {
      alert("Você precisa estar autenticado para realizar essa ação.");
      return;
    }

    try {
      const response = await axios.post(
        `${api_base_url}/servicos/novo`, 
        { tamanho, complexidade, cores, preco },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      resultado = response.data;
      error = null;
    } catch (err) {
      console.error(err);
      resultado = null;
      error = err.response?.data?.message || "Erro ao cadastrar serviço.";
    }
  };
</script>

<HeaderAdm />
<main class="container mt-5">
  <h1 class="text-center mb-4">Cadastro de Serviço</h1>

  <form on:submit|preventDefault={calcularPrecoTatuagem} class="row g-3">
    <div class="col-12">
      <label for="tamanho" class="form-label">Tamanho</label>
      <input
        type="number"
        class="form-control"
        id="tamanho"
        bind:value={tamanho}
        placeholder="Tamanho da tatuagem em cm"
        min="1"
        required
      />
    </div>

    <div class="col-12">
      <label class="form-label">Complexidade</label>
      <div>
        <label>
          <input type="radio" bind:group={complexidade} value="simples" required />
          Simples
        </label>
        <label>
          <input type="radio" bind:group={complexidade} value="complexa" required />
          Complexa
        </label>
      </div>
    </div>

    <div class="col-12">
      <label class="form-label">Cores</label>
      <div>
        <label>
          <input type="radio" bind:group={cores} value="unicolor" required />
          Unicolor
        </label>
        <label>
          <input type="radio" bind:group={cores} value="multicolor" required />
          Multicolor
        </label>
      </div>
    </div>

    {#if error}
      <div class="col-12 alert alert-danger">{error}</div>
    {/if}

    {#if resultado}
      <div class="col-12 alert alert-success">{resultado.message}</div>
    {/if}

    <div class="col-12 text-center">
      <button type="submit" class="btn btn-primary w-100 w-md-auto">Cadastrar Serviço</button>
    </div>
  </form>
</main>

<style>
  main {
    max-width: 100%;
    margin: auto;
    padding: 15px;
  }

  @media (min-width: 768px) {
    main {
      max-width: 600px;
    }
  }
</style>
