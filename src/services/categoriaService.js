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

export function obtenerCategoria(id) {
  return peticion(API_URL, `/api/v1/categorias/${id}`);
}

export function crearCategoria(nombre) {
  return peticion(API_URL, "/api/v1/categorias", { metodo: "POST", cuerpo: { nombre } });
}

export function actualizarCategoria(id, nombre) {
  return peticion(API_URL, `/api/v1/categorias/${id}`, { metodo: "PUT", cuerpo: { nombre } });
}

export function eliminarCategoria(id) {
  return peticion(API_URL, `/api/v1/categorias/${id}`, { metodo: "DELETE" });
}
