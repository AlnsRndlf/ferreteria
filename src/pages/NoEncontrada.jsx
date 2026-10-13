import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NoEncontrada() {
  return (
    <Container as="main" className="py-4">
      <h1>Página no encontrada</h1>
      <p>La dirección solicitada no corresponde a una vista disponible.</p>
      <Link to="/productos">Ir al catálogo</Link>
    </Container>
  );
}

export default NoEncontrada;