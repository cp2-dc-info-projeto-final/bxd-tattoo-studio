import { writable } from "svelte/store";
import { sessionStore } from "./session"; // Importa o store da sessão

// Define o estado atual da página (controle da navegação)
export const paginaAtual = writable("adm");

// Função para redirecionar para a página de login
export const irParaLogin = () => {
  paginaAtual.set("login")
};
// Função para redirecionar para a página de login de adms
export const irParaLoginADM = () => {
  paginaAtual.set("loginadm")
};

// Home de ADM (Teste)
export const irParaHomeADM = () => {
  sessionStore.subscribe((token) => {
    if (!token) {
      // Se não houver token, redireciona para login
      paginaAtual.set("login");
    } else {
      // Se houver token, redireciona para a home de ADM
      paginaAtual.set("homeadm");
    }
  });
};

// Função para redirecionar para a página de ADM/adm
export const administrarADM = () => {
  paginaAtual.set("admadm");
};

// Função para redirecionar para a página de ADM/adm
export const administrarUser = () => {
  paginaAtual.set("admuser");
};

// Função para redirecionar para a página de ADM/adm
export const administrarServico = () => {
  paginaAtual.set("admservico");
};

// Função para redirecionar para a página de agendamento
export const irParaAgendamento = () => {
  sessionStore.subscribe((token) => {
    if (!token) {
      paginaAtual.set('login'); // Redireciona se o usuário não estiver logado
    } else {
      paginaAtual.set('agendamento'); // Se estiver logado, redireciona para agendamento
    }
  });
};

// Função para redirecionar para a página de cadastro
export const irParaCadastro = () => {
  paginaAtual.set("cadastro");
};

// Função para redirecionar para a página inicial
export const irParaHome = () => {
  paginaAtual.set("home");
};

// Função para redirecionar para a página de ADM/adm
export const administrarHora = () => {
  paginaAtual.set("admhora");
};

// Função para redirecionar para a página de cadastro de servicos
export const irParaCadastroSRC = () => {
  paginaAtual.set("cadsrc");
};

// Função para logout
export const logout = () => {
  sessionStore.set(null); // Limpa o token da sessão
  irParaLogin(); // Redireciona para a página de login
};

// Função para redirecionar para a página de agendamento
export const irParaCadastroADM = () => {
  paginaAtual.set("cadadm");
};

// Função para redirecionar para a página de agendamento
export const irParaCadastroHora = () => {
  paginaAtual.set("cadhora");
};

// Função para redirecionar para a página de agendamento
export const agendamento1 = () => {
  paginaAtual.set("ag1");
};

// Função para redirecionar para a página de agendamento
export const agendamento2 = () => {
  paginaAtual.set("ag2");
};

// Função para redirecionar para a página de agendamento
export const agendamento3 = () => {
  paginaAtual.set("ag3");
};


// Define a URL base da API
export const api_base_url = "http://localhost:3000";
