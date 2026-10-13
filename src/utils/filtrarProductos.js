export function filtrarProductos(productos, { categoria = "Todas", texto = "" } = {}) {
  const buscado = texto.trim().toLowerCase();

  return productos.filter((producto) => {
    const coincideCategoria = categoria === "Todas" || producto.categoria === categoria;

    const coincideTexto =
      buscado === "" ||
      [producto.nombre, producto.codigo, producto.marca].some((campo) =>
        String(campo || "").toLowerCase().includes(buscado)
      );

    return coincideCategoria && coincideTexto;
  });
}