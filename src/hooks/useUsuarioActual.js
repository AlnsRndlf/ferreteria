import { useContext, useState } from "react";
import { SesionContext } from "../context/SesionContext";
import { borrarSesion, guardarSesion, leerSesion } from "../services/sesion";

export function useUsuarioActual() {
  const contexto = useContext(SesionContext);
  const [usuarioLocal, setUsuarioLocal] = useState(() => leerSesion());

  if (contexto) {
    return contexto;
  }

  // Respaldo para componentes que se usan sin SesionProvider (por ejemplo, en pruebas)
  return {
    usuario: usuarioLocal,
    cargando: false,
    iniciarSesion(datosUsuario) {
      guardarSesion(datosUsuario);
      setUsuarioLocal(datosUsuario);
    },
    cerrarSesion() {
      borrarSesion();
      setUsuarioLocal(null);
    },
  };
}
