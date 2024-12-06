import { writable } from "svelte/store";
import { paginaAtual } from "./navigation"; // Importe a store de paginaAtual

// Store para controlar a navegação dentro do iframe
export const iframeAtual = writable("");

// Funções para mudar a página exibida no iframe
export const irParaCadastroADM = () => {
  iframeAtual.set("cadastroAdm");
  paginaAtual.set("homeadm"); // Reseta a página atual quando carregar o iframe
};
export const irParaCadastroSRC = () => {
  iframeAtual.set("cadastroSrc");
  paginaAtual.set("homeadm"); // Reseta a página atual quando carregar o iframe
};
export const irParaCadastroHora = () => {
  iframeAtual.set("cadastroHora");
  paginaAtual.set("homeadm"); // Reseta a página atual quando carregar o iframe
};
export const administrarADM = () => {
  iframeAtual.set("editarAdm");
  paginaAtual.set("homeadm"); // Reseta a página atual quando carregar o iframe
};
export const administrarUser = () => {
  iframeAtual.set("editarUser");
  paginaAtual.set("homeadm"); // Reseta a página atual quando carregar o iframe
};
export const administrarServico = () => {
  iframeAtual.set("editarServico");
  paginaAtual.set("homeadm"); // Reseta a página atual quando carregar o iframe
};
export const administrarHora = () => {
  iframeAtual.set("editarHora");
  paginaAtual.set("homeadm"); // Reseta a página atual quando carregar o iframe
};
