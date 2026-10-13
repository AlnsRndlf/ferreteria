
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import GrillaProductos from "../components/GrillaProductos";
import { useCarrito } from "../context/CarritoContext";
import { obtenerCategorias, obtenerProductos } from "../data/productos";
import { filtrarProductos } from "../utils/filtrarProductos";

function Categorias({ onAgregarCarrito }) {
  const { nombre } = useParams();
  const { agregar } = useCarrito();

  const categorias = obtenerCategorias();
  const productos = obtenerProductos();
  const existe = !nombre || categorias.includes(nombre);

  function agregarAlCarrito(producto) {
    if (onAgregarCarrito) {
      onAgregarCarrito(producto);
    } else {
      agregar(producto);
    }
  }

  return (
    <Container as="main" className="py-4">
      <h1 className="mb-3">Categorías</h1>

      <Row className="g-3 mb-4">
        {categorias.map((categoria) => {
          const cantidad = filtrarProductos(productos, { categoria }).length;
          const activa = categoria === nombre;

          return (
            <Col xs={6} md={4} xl={3} key={categoria}>
              <Card
                className={`h-100 text-center ${activa ? "border-primary border-2" : ""}`}
              >
                <Card.Body>
                  <Card.Title as="h2" className="h6">
                    <Link to={`/categorias/${encodeURIComponent(categoria)}`}>
                      {categoria}
                    </Link>
                  </Card.Title>
                  <Card.Text className="text-muted small">{cantidad} productos</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {!nombre && <p className="text-muted">Elige una categoría para ver sus productos.</p>}

      {nombre && !existe && (
        <p className="text-danger fw-bold">La categoría solicitada no existe.</p>
      )}

      {nombre && existe && (
        <section aria-labelledby="titulo-categoria">
          <h2 id="titulo-categoria" className="h4 mb-3">{nombre}</h2>
          <GrillaProductos
            productos={filtrarProductos(productos, { categoria: nombre })}
            onAgregarCarrito={agregarAlCarrito}
          />
        </section>
      )}
    </Container>
  );
}

export default Categorias;
