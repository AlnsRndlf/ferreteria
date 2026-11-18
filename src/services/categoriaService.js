import { API_URL } from "../config/api";
import { peticion } from "./http";

// [{ id, nombre }, ...]
export function listarCategorias() {
  return peticion(API_URL, "/api/v1/categorias");
}

// ["Herramientas manuales", ...] (para menús y filtros)
export async function listarNombresCategorias() {
  const lista = await listarCategorias();
  return lista.map((categoria) => categoria.nombre);
}
