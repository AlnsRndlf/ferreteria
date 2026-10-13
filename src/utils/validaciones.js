import { validarCorreoPermitido, validarRun } from "./validarRun";

export function validarLogin({ correo, contrasena }) {
  const errores = {};

  if (!correo.trim()) {
    errores.correo = "El correo es obligatorio.";
  } else if (correo.length > 100 || !validarCorreoPermitido(correo)) {
    errores.correo = "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
  }

  if (!contrasena) {
    errores.contrasena = "La contraseña es obligatoria.";
  } else if (contrasena.length < 4 || contrasena.length > 10) {
    errores.contrasena = "La contraseña debe tener entre 4 y 10 caracteres.";
  }

  return errores;
}

export function validarContacto({ nombre, correo, comentario }) {
  const errores = {};

  if (!nombre.trim()) {
    errores.nombre = "El nombre es obligatorio.";
  } else if (nombre.length > 100) {
    errores.nombre = "Máximo 100 caracteres.";
  }

  // En el PDF el correo de contacto no es obligatorio, pero si se
  // escribe debe tener un dominio permitido.
  if (correo.trim() && (correo.length > 100 || !validarCorreoPermitido(correo))) {
    errores.correo = "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
  }

  if (!comentario.trim()) {
    errores.comentario = "El comentario es obligatorio.";
  } else if (comentario.length > 500) {
    errores.comentario = "Máximo 500 caracteres.";
  }

  return errores;
}

export function validarRegistro(datos) {
  const errores = {};

  if (!validarRun(datos.run)) {
    errores.run = "RUN inválido (sin puntos ni guion, ej: 123456785).";
  }
  if (!datos.nombre.trim() || datos.nombre.length > 50) {
    errores.nombre = "Obligatorio (máximo 50 caracteres).";
  }
  if (!datos.apellidos.trim() || datos.apellidos.length > 100) {
    errores.apellidos = "Obligatorio (máximo 100 caracteres).";
  }
  if (!validarCorreoPermitido(datos.correo) || datos.correo.length > 100) {
    errores.correo = "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
  }
  if (datos.contrasena.length < 4 || datos.contrasena.length > 10) {
    errores.contrasena = "La contraseña debe tener entre 4 y 10 caracteres.";
  }
  if (!datos.region) errores.region = "Selecciona una región.";
  if (!datos.comuna) errores.comuna = "Selecciona una comuna.";
  if (!datos.direccion.trim() || datos.direccion.length > 300) {
    errores.direccion = "Obligatoria (máximo 300 caracteres).";
  }

  return errores;
}