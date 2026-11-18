import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import GrillaProductos from "../components/GrillaProductos";
import { useCarrito } from "../context/CarritoContext";
import EstadoCarga from "../components/EstadoCarga";
import { useApi } from "../hooks/useApi";
import { listarProductos } from "../services/productoService";

// Selección variada: una herramienta manual, una pintura, una herramienta
// eléctrica y un producto de jardín.
const CODIGOS_DESTACADOS = ["HM001", "PT001", "HE001", "JA001"];

function Inicio({ onAgregarCarrito }) {
  const { agregar } = useCarrito();

  const { datos, cargando, error } = useApi(listarProductos, []);
  const productos = datos ?? [];
  const destacados = CODIGOS_DESTACADOS
    .map((codigo) => productos.find((producto) => producto.codigo === codigo))
    .filter(Boolean);

  function agregarAlCarrito(producto) {
    if (onAgregarCarrito) {
      onAgregarCarrito(producto);
    } else {
      agregar(producto);
    }
  }

  return (
    <main>
      <section className="bg-light py-5">
        <Container>
          <Row className="align-items-center g-4">
            <Col xs={12} md={6}>
              <h1 className="display-5 fw-bold">Ferretería Los Maestros</h1>
              <p className="lead">
                Herramientas, materiales y todo lo que necesitas para tus
                proyectos. Consulta el stock sin llamar y compra de forma
                rápida y sencilla.
              </p>
              <Button as={Link} to="/productos" size="lg">
                🛒 Ver productos
              </Button>
            </Col>
            <Col xs={12} md={6}>
              <img
                src="/img/hermanos.png"
                alt="Fachada de Ferretería Los Maestros"
                className="img-fluid rounded shadow-sm"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="py-4">
        <h2 className="text-center mb-4">Productos destacados</h2>
        <EstadoCarga cargando={cargando} error={error}>
          <GrillaProductos productos={destacados} onAgregarCarrito={agregarAlCarrito} />
        </EstadoCarga>
      </Container>
    </main>
  );
}

export default Inicio;