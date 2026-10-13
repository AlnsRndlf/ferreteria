import { Navigate } from "react-router-dom";
import { useUsuarioActual } from "../hooks/useUsuarioActual";

function RutaProtegida({ rolesPermitidos, children }) {
  const { usuario, cargando } = useUsuarioActual();

  if (cargando) {
    return <p className="text-center py-5">Cargando...</p>;
  }

  if (!usuario) {
    return <Navigate to="/inicio-sesion" replace />;
  }

  if (!rolesPermitidos.includes(usuario.tipoUsuario)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RutaProtegida;