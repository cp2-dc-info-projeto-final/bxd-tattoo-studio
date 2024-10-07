import { writable } from "svelte/store";

export const paginaAtual = writable("home");

export const irParaLogin = () => {
  paginaAtual.set("login");
};

export const irParaCadastro = () => {
  paginaAtual.set("cadastro");
};

export const irParaHome = () => {
  paginaAtual.set("home");
};
