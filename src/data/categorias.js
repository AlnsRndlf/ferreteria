import { obtenerCategorias as obtenerCategoriasDeProductos } from "./productos";
import { guardarDatos, leerDatos } from "../utils/persistencia";

const CLAVE_CATEGORIAS = "categorias";

const categoriasIniciales = obtenerCategoriasDeProductos().map(
  (nombre, indice) => ({ id: indice + 1, nombre })
);

export const categorias = leerDatos(CLAVE_CATEGORIAS, categoriasIniciales);

function guardarCategorias() {
  guardarDatos(CLAVE_CATEGORIAS, categorias);
}

function calcularSiguienteId() {
  const ids = categorias.map((categoria) => categoria.id);
  return ids.length === 0 ? 1 : Math.max(...ids) + 1;
}


// LEER
export function obtenerCategorias() {
  return categorias;
}

export function obtenerCategoriaPorId(id) {
  return categorias.find((categoria) => categoria.id === id) || null;
}


// CREAR
export function crearCategoria(nombre) {
  const nuevaCategoria = { id: calcularSiguienteId(), nombre };
  categorias.push(nuevaCategoria);
  guardarCategorias();
  return nuevaCategoria;
}


// ACTUALIZAR
export function actualizarCategoria(id, nombreNuevo) {
  const categoria = obtenerCategoriaPorId(id);

  if (!categoria) {
    return null;
  }

  categoria.nombre = nombreNuevo;
  guardarCategorias();
  return categoria;
}


// ELIMINAR
export function eliminarCategoria(id) {
  const indice = categorias.findIndex((categoria) => categoria.id === id);

  if (indice === -1) {
    return false;
  }

  categorias.splice(indice, 1);
  guardarCategorias();
  return true;
}