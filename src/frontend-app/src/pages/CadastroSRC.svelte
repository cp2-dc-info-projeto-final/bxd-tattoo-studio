<script>
  import { irParaLogin } from "../stores/navigation";
  import axios from "axios";
  import HeaderAdm from "./header/HeaderAdm.svelte";

  let usuario = {};
  let tamanho;
  let complexidade = "";
  let cores = "";
  let precoBase;

  function calcularPrecoTatuagem() {
    let tamanhoClassificado;
    if (tamanho <= 5) {
      tamanhoClassificado = "pequeno";
    } else if (tamanho > 5 && tamanho <= 15) {
      tamanhoClassificado = "medio";
    } else {
      tamanhoClassificado = "grande";
    }

    if (tamanhoClassificado && complexidade && cores) {
      let precos = {
        pequeno: { simples: { unicolor: 350, multicolor: 450 }, complexa: { unicolor: 450, multicolor: 600 } },
        medio: { simples: { unicolor: 950, multicolor: 1000 }, complexa: { unicolor: 1000, multicolor: 1250 } },
        grande: { simples: { unicolor: 1250, multicolor: 1350 }, complexa: { unicolor: 1350, multicolor: 1500 } }
      };
      precoBase = precos[tamanhoClassificado][complexidade][cores];
      cadastrarServico(tamanhoClassificado, complexidade, cores, precoBase);
    } else {
      alert("Preencha todos os campos corretamente.");
    }
  }

  const cadastrarServico = async (tamanho, complexidade, cores, preco) => {
    try {
      const response = await axios.post("http://localhost:3000/servicos/novo", { tamanho, complexidade, cores, preco });
      alert(response.data.message);
    } catch (error) {
      alert("Erro ao cadastrar serviço.");
    }
  };

  const pegaDadosUsuario = async () => {
    const response = await fetch("http://localhost:3000/api/usuarios/me", { method: "GET", credentials: "include" });
    const data = await response.json();
    usuario = data.id_usuario ? data : irParaLogin();
  };

  pegaDadosUsuario();
</script>

<HeaderAdm />
<main>
  <div class="container mt-5">
    <div class="row justify-content-center align-items-center">
      <div class="col-lg-6 col-md-8 col-sm-12">
        <h2 class="text-center mb-4">Cadastro de Serviço</h2>
        <form on:submit|preventDefault={calcularPrecoTatuagem}>
          <div class="mb-3">
            <label for="tamanho" class="form-label">Tamanho</label>
            <input
              type="number"
              class="form-control"
              id="tamanho"
              bind:value={tamanho}
              placeholder="Tamanho da tatuagem em cm"
              required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Complexidade</label>
            <div>
              <label class="form-check-label me-3">
                <input type="radio" class="form-check-input" bind:group={complexidade} value="simples" /> Simples
              </label>
              <label class="form-check-label">
                <input type="radio" class="form-check-input" bind:group={complexidade} value="complexa" /> Complexa
              </label>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Cores</label>
            <div>
              <label class="form-check-label me-3">
                <input type="radio" class="form-check-input" bind:group={cores} value="unicolor" /> Unicolor
              </label>
              <label class="form-check-label">
                <input type="radio" class="form-check-input" bind:group={cores} value="multicolor" /> Multicolor
              </label>
            </div>
          </div>

          <button type="submit" class="btn btn-primary w-100">Cadastrar Serviço</button>
        </form>
      </div>
    </div>
  </div>
</main>
