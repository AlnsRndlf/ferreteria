// Direcciones de los dos backends.
// - En desarrollo (npm run dev): cada backend en su puerto de localhost.
// - En producción (npm run build): rutas relativas, porque Nginx publica todo bajo el mismo
//   dominio y reparte /api/v1/auth y /api/v1/usuarios a Auth, y el resto de /api/v1 a la tienda.
// También se pueden forzar con las variables VITE_AUTH_URL y VITE_API_URL.
const enProduccion = import.meta.env.PROD;

export const AUTH_URL =
  import.meta.env.VITE_AUTH_URL ?? (enProduccion ? "" : "http://localhost:8081");
export const API_URL =
  import.meta.env.VITE_API_URL ?? (enProduccion ? "" : "http://localhost:8082");
