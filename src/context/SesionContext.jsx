/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { refrescar } from "../services/authService";
import { borrarSesion, guardarSesion, leerSesion, tokenVigente } from "../services/sesion";

export const SesionContext = createContext(null);

export function SesionProvider({ children }) {
  // Al cargar (o recargar) la página se recupera la sesión guardada,
  // pero solo si el token todavía no venció.
  const [usuario, setUsuario] = useState(() => {
    const guardada = leerSesion();
    return guardada && tokenVigente(guardada.token) ? guardada : null;
  });

  function iniciarSesion(datosUsuario) {
    guardarSesion(datosUsuario);
    setUsuario(datosUsuario);
  }

  function cerrarSesion() {
    borrarSesion();
    setUsuario(null);
  }

  // Si el backend responde 401 (token vencido o falso), la capa http avisa con este evento
  useEffect(() => {
    const alExpirar = () => setUsuario(null);
    window.addEventListener("sesion-expirada", alExpirar);
    return () => window.removeEventListener("sesion-expirada", alExpirar);
  }, []);

  // Al cargar la página, si hay sesión, se renueva el token (con eso también se valida con el servidor)
  useEffect(() => {
    if (!usuario?.token) return;
    refrescar()
      .then((renovada) => {
        guardarSesion(renovada);
        setUsuario(renovada);
      })
      .catch(() => {
        // Si fue un 401, la capa http ya cerró la sesión. Si no hubo red, se mantiene.
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SesionContext.Provider value={{ usuario, cargando: false, iniciarSesion, cerrarSesion }}>
      {children}
    </SesionContext.Provider>
  );
}
