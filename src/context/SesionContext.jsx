/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { guardarDatos, leerDatos } from "../utils/persistencia";

export const CLAVE_SESION = "usuarioActual";

export const SesionContext = createContext(null);

export function SesionProvider({ children }) {
  const [usuario, setUsuario] = useState(() => leerDatos(CLAVE_SESION, null));

  function iniciarSesion(datosUsuario) {
    guardarDatos(CLAVE_SESION, datosUsuario);
    setUsuario(datosUsuario);
  }

  function cerrarSesion() {
    localStorage.removeItem(CLAVE_SESION);
    setUsuario(null);
  }

  return (
    <SesionContext.Provider value={{ usuario, cargando: false, iniciarSesion, cerrarSesion }}>
      {children}
    </SesionContext.Provider>
  );
}
