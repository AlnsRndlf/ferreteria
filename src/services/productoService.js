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

// Convierte los datos del formulario en lo que espera el backend
function aSolicitud(d) {
  return {
    codigo: d.codigo.trim(),
    nombre: d.nombre.trim(),
    marca: d.marca || null,
    unidad: d.unidad || null,
    subcategoria: d.subcategoria || null,
    descripcion: d.descripcion || null,
    precio: Number(d.precio),
    stock: Number(d.stock),
    stockMinimo: d.stockMinimo === "" || d.stockMinimo == null ? 0 : Number(d.stockMinimo),
    descuento: d.descuento === "" || d.descuento == null ? 0 : Number(d.descuento),
    imagen: d.imagen || null,
    categoriaId: d.categoriaId,
  };
}

export async function crearProducto(datos) {
  const creado = await peticion(API_URL, "/api/v1/productos", {
    metodo: "POST",
    cuerpo: aSolicitud(datos),
  });
  return aProducto(creado);
}

export async function actualizarProducto(id, datos) {
  const actualizado = await peticion(API_URL, `/api/v1/productos/${id}`, {
    metodo: "PUT",
    cuerpo: aSolicitud(datos),
  });
  return aProducto(actualizado);
}

export function eliminarProducto(id) {
  return peticion(API_URL, `/api/v1/productos/${id}`, { metodo: "DELETE" });
}

// El backend actualiza el producto completo, así que se reenvían sus datos con el stock nuevo
export function actualizarStock(producto, nuevoStock) {
  return actualizarProducto(producto.id, { ...producto, stock: nuevoStock });
}
