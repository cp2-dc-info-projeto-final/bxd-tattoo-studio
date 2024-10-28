<script>
  import { irParaLogin } from "../stores/navigation";
  import axios from "axios";

  let usuario = {};
  let tamanho;
  let complexidade = ""; // Inicializa como string vazia
  let cores = ""; // Inicializa como string vazia
  let precoBase;

  // Função de logout
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/logout",
        {},
        { withCredentials: true },
      );
      alert("Logout realizado com sucesso!");
      irParaLogin(); // Redireciona para a página de login
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
      alert("Erro ao realizar logout.");
    }
  };

  // Função para calcular o preço da tatuagem
  function calcularPrecoTatuagem() {
    // Determinação do tamanho
    if (tamanho <= 5) {
      tamanho = "pequena";
    } else if (tamanho > 5 && tamanho <= 15) {
      tamanho = "media";
    } else {
      tamanho = "grande";
    }

    // Definindo o preço base de acordo com tamanho, complexidade e cores
    if (tamanho === "pequena") {
      if (complexidade === "simples" && cores === "unicolor") {
        precoBase = 350;
        complexidade = "";
        cores = "";
      } else if (complexidade === "complexa" && cores === "unicolor") {
        precoBase = 450;
        complexidade = "";
        cores = "";
      } else if (complexidade === "simples" && cores === "multicolor") {
        precoBase = 450;
        complexidade = "";
        cores = "";
      } else if (complexidade === "complexa" && cores === "multicolor") {
        precoBase = 600;
        complexidade = "";
        cores = "";
      }
    } else if (tamanho === "media") {
      if (complexidade === "simples" && cores === "unicolor") {
        precoBase = 950;
        complexidade = "";
        cores = "";
      } else if (complexidade === "complexa" && cores === "unicolor") {
        precoBase = 1000;
        complexidade = "";
        cores = "";
      } else if (complexidade === "simples" && cores === "multicolor") {
        precoBase = 1000;
        complexidade = "";
        cores = "";
      } else if (complexidade === "complexa" && cores === "multicolor") {
        precoBase = 1250;
        complexidade = "";
        cores = "";
      }
    } else if (tamanho === "grande") {
      if (complexidade === "simples" && cores === "unicolor") {
        precoBase = 1250;
        complexidade = "";
        cores = "";
      } else if (complexidade === "complexa" && cores === "unicolor") {
        precoBase = 1350;
        complexidade = "";
        cores = "";
      } else if (complexidade === "simples" && cores === "multicolor") {
        precoBase = 1350;
        complexidade = "";
        cores = "";
      } else if (complexidade === "complexa" && cores === "multicolor") {
        precoBase = 1500;
        complexidade = "";
        cores = "";
      }
    }

    alert(`O preço estimado para a tatuagem é R$ ${precoBase}`);
  }

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
        <h2 class="text-center mb-4">Agendamento</h2>
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
                <input
                  type="radio"
                  bind:group={complexidade}
                  value="complexa"
                /> Complexa
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

          <button type="submit" class="btn btn-success w-100"
            >Calcular Preço</button
          >
        </form>
      </div>
    </div>
  </div>

  <button type="button" class="btn btn-danger mt-4" on:click={logout}
    >Logout</button
  >
</div>
