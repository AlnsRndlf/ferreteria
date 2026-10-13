import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import ImagenProducto from "../components/ImagenProducto";
import { obtenerProductoPorCodigo } from "../data/productos";
import { esStockCritico } from "../utils/stock";
import { useCarrito } from "../context/CarritoContext";
import { formatearPrecio, precioFinal, tieneOferta } from "../utils/precio";

function DetalleProducto({ onAgregarCarrito }) {
  // El código llega desde la URL /productos/:codigo (Guía 11).
  const { codigo } = useParams();
  const { agregar: agregarAlCarrito } = useCarrito();
  const producto = obtenerProductoPorCodigo(codigo);

  if (!producto) {
    return (
      <Container as="main" className="py-4">
        <p className="text-danger fw-bold">
          El producto solicitado no existe.
        </p>
        <Link to="/productos">Volver a productos</Link>
      </Container>
    );
  }

  const stockCritico = esStockCritico(producto);

  function agregar() {
    if (onAgregarCarrito) {
      onAgregarCarrito(producto);
    } else {
      agregarAlCarrito(producto);
    }
  }

  return (
    <Container as="main" className="py-4">
      <nav aria-label="Ruta de navegación" className="small text-muted mb-3">
        <Link to="/productos">Productos</Link> / {producto.nombre}
      </nav>

      <Row className="g-4">
        <Col xs={12} md={6}>
          <ImagenProducto producto={producto} className="rounded" grande />
        </Col>

        <Col xs={12} md={6}>
          <p className="text-uppercase text-primary fw-bold small">
            {producto.categoria}
          </p>

          <h1 className="h3">{producto.nombre}</h1>

          <p className="text-muted">{producto.descripcion}</p>

          {tieneOferta(producto) ? (
            <p className="fs-3 fw-bold">
              <span className="text-decoration-line-through text-muted fs-5 me-2">
                {formatearPrecio(producto.precio)}
              </span>
              <span className="text-danger">{formatearPrecio(precioFinal(producto))}</span>{" "}
              <span className="badge bg-danger fs-6">-{producto.descuento}%</span>
            </p>
          ) : (
            <p className="fs-3 fw-bold">{formatearPrecio(producto.precio)}</p>
          )}

          <p className={producto.stock > 0 ? "text-success" : "text-danger"}>
            {producto.stock > 0
              ? "Disponible para despacho"
              : "Sin stock disponible"}
          </p>

          {stockCritico && (
            <p className="text-danger fw-bold">
              ¡Quedan pocas unidades! Stock crítico: {producto.stock}{" "}
              disponibles.
            </p>
          )}

          <Button
            className="mb-4"
            onClick={agregar}
            disabled={producto.stock === 0}
          >
            Agregar al carrito
          </Button>

          <Table responsive size="sm">
            <tbody>
              <tr>
                <th scope="row">Código</th>
                <td>{producto.codigo}</td>
              </tr>
              <tr>
                <th scope="row">Marca</th>
                <td>{producto.marca}</td>
              </tr>
              <tr>
                <th scope="row">Unidad de venta</th>
                <td>{producto.unidad}</td>
              </tr>
              <tr>
                <th scope="row">Stock disponible</th>
                <td>{producto.stock} unidades</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default DetalleProducto;
