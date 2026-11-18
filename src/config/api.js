// Direcciones de los dos backends. En AWS se cambiarán con variables de Vite.
export const AUTH_URL = import.meta.env.VITE_AUTH_URL ?? "http://localhost:8081";
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8082";
