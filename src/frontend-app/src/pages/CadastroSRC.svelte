<script>
  import { irParaLogin } from "../stores/navigation";
  import axios from "axios";

  let usuario = {};
  let tamanho;
  let complexidade = ""; // Inicializa como string vazia
  let cores = ""; // Inicializa como string vazia
  let precoBase;

  // Função para calcular o preço da tatuagem
  function calcularPrecoTatuagem() {
    // Determinação do tamanho
    let tamanhoClassificado;
    if (tamanho <= 5) {
      tamanhoClassificado = "pequeno";
    } else if (tamanho > 5 && tamanho <= 15) {
      tamanhoClassificado = "medio";
    } else {
      tamanhoClassificado = "grande";
    }

    // Definindo o preço base de acordo com tamanho, complexidade e cores
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

    // Salva os dados no banco de dados
    if (tamanhoClassificado && complexidade && cores && precoBase) {
      cadastrarServico(tamanhoClassificado, complexidade, cores, precoBase);
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  }

  const cadastrarServico = async (tamanho, complexidade, cores, preco) => {
    try {
      const response = await axios.post("http://localhost:3000/servicos/novo", {
        tamanho,
        complexidade,
        cores,
        preco,
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Erro ao cadastrar serviço:", error);
      alert("Erro ao cadastrar serviço.");
    }
  };

  const pegaDadosUsuario = async () => {
    const response = await fetch("http://localhost:3000/api/usuarios/me", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    if (data.id_usuario) {
      usuario = data;
    } else {
      irParaLogin();
    }
  };

  pegaDadosUsuario();
</script>

<div class="container mt-5">
  <h1>Bem-vindo, {usuario.nome}</h1>
  <p>Email: {usuario.email}</p>

  <div class="container mt-5">
    <div
      class="row justify-content-center m-auto align-items-center d-flex"
      style="width: 600px; padding-top: 100px; padding-bottom: 100px;"
    >
      <div class="col-md-5">
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
              <label>
                <input type="radio" bind:group={complexidade} value="simples" />
                Simples
              </label>
              <label>
                <input type="radio" bind:group={complexidade} value="complexa" />
                Complexa
              </label>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Cores</label>
            <div>
              <label>
                <input type="radio" bind:group={cores} value="unicolor" /> Unicolor
              </label>
              <label>
                <input type="radio" bind:group={cores} value="multicolor" /> Multicolor
              </label>
            </div>
          </div>

          <button type="submit" class="btn btn-success w-100">Cadastrar Serviço</button>
        </form>
      </div>
    </div>
  </div>
</div>

