import { useContext, useState } from "react";
import { CLAVE_SESION, SesionContext } from "../context/SesionContext";
import { guardarDatos, leerDatos } from "../utils/persistencia";

export function useUsuarioActual() {
  const contexto = useContext(SesionContext);
  const [usuarioLocal, setUsuarioLocal] = useState(() => leerDatos(CLAVE_SESION, null));

  if (contexto) {
    return contexto;
  }

  return {
    usuario: usuarioLocal,
    cargando: false,
    iniciarSesion(datosUsuario) {
      guardarDatos(CLAVE_SESION, datosUsuario);
      setUsuarioLocal(datosUsuario);
    },
    cerrarSesion() {
      localStorage.removeItem(CLAVE_SESION);
      setUsuarioLocal(null);
    },
  };
}
