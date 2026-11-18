import { useEffect, useState } from "react";

// Ejecuta una función que llama al backend y entrega { datos, cargando, error }.
// Se vuelve a ejecutar si cambian las dependencias, o al llamar a recargar().
export function useApi(funcion, dependencias = []) {
  const [estado, setEstado] = useState({ datos: null, cargando: true, error: "" });
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let activo = true;
    setEstado((anterior) => ({ ...anterior, cargando: true, error: "" }));

    funcion()
      .then((datos) => {
        if (activo) setEstado({ datos, cargando: false, error: "" });
      })
      .catch((error) => {
        if (activo) setEstado({ datos: null, cargando: false, error: error.message });
      });

    return () => {
      activo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencias, version]);

  return { ...estado, recargar: () => setVersion((v) => v + 1) };
}
