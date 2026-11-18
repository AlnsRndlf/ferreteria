import { Alert } from "react-bootstrap";

// Muestra "Cargando...", un error, o el contenido cuando los datos ya llegaron
function EstadoCarga({ cargando, error, children }) {
  if (cargando) {
    return <p className="text-center text-muted py-4">Cargando...</p>;
  }
  if (error) {
    return <Alert variant="danger" className="my-3">{error}</Alert>;
  }
  return children;
}

export default EstadoCarga;
