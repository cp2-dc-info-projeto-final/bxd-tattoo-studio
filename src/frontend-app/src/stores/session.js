import { writable } from 'svelte/store';

export const sessionStore = writable(null);

// Função para salvar o token na sessão
export const setSession = (token) => {
  sessionStore.set(token);
};
