import { API_URL } from "../config/api";
import { peticion } from "./http";

// El backend entrega la categoría como { id, nombre }.
// Las pantallas usan solo el nombre, así que aquí se "aplana".
function aProducto(p) {
  return {
    id: p.id,
    codigo: p.codigo,
    categoria: p.categoria.nombre,
    categoriaId: p.categoria.id,
    subcategoria: p.subcategoria,
    nombre: p.nombre,
    marca: p.marca,
    unidad: p.unidad,
    descripcion: p.descripcion,
    precio: p.precio,
    stock: p.stock,
    stockMinimo: p.stockMinimo,
    descuento: p.descuento,
    imagen: p.imagen,
  };
}

export async function listarProductos() {
  const lista = await peticion(API_URL, "/api/v1/productos");
  return lista.map(aProducto);
}

// Devuelve null si el producto no existe (404)
export async function obtenerProductoPorCodigo(codigo) {
  try {
    const producto = await peticion(API_URL, `/api/v1/productos/codigo/${encodeURIComponent(codigo)}`);
    return aProducto(producto);
  } catch (error) {
    if (error.status === 404) return null;
    throw error;
  }
}

export async function listarProductosCriticos() {
  const lista = await peticion(API_URL, "/api/v1/productos/stock-critico");
  return lista.map(aProducto);
}