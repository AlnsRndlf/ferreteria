export function validarProducto(datos) {
  const errores = {};

  if (!datos.codigo || datos.codigo.trim().length < 3) {
    errores.codigo = "El código es obligatorio (mínimo 3 caracteres).";
  }

  if (!datos.nombre || !datos.nombre.trim()) {
    errores.nombre = "El nombre es obligatorio.";
  } else if (datos.nombre.length > 100) {
    errores.nombre = "Máximo 100 caracteres.";
  }

  if (datos.descripcion && datos.descripcion.length > 500) {
    errores.descripcion = "Máximo 500 caracteres.";
  }

  if (datos.precio === "" || datos.precio === undefined || Number(datos.precio) < 0) {
    errores.precio = "El precio es obligatorio y no puede ser negativo.";
  }

  if (
    datos.stock === "" ||
    datos.stock === undefined ||
    !Number.isInteger(Number(datos.stock)) ||
    Number(datos.stock) < 0
  ) {
    errores.stock = "El stock es obligatorio y debe ser un número entero.";
  }

  if (
    datos.stockMinimo !== "" &&
    datos.stockMinimo !== undefined &&
    (!Number.isInteger(Number(datos.stockMinimo)) || Number(datos.stockMinimo) < 0)
  ) {
    errores.stockMinimo = "El stock crítico debe ser un número entero.";
  }

  if (
    datos.descuento !== "" &&
    datos.descuento !== undefined &&
    (Number(datos.descuento) < 0 || Number(datos.descuento) > 90)
  ) {
    errores.descuento = "El descuento debe estar entre 0 y 90 %.";
  }

  if (!datos.categoria) {
    errores.categoria = "Selecciona una categoría.";
  }

  return errores;
}