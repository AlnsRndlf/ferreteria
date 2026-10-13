import { Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImagenProducto from "./ImagenProducto";
import { esStockCritico } from "../utils/stock";
import { formatearPrecio, precioFinal, tieneOferta } from "../utils/precio";

function TarjetaProducto({ producto, onAgregarCarrito }) {
  const stockCritico = esStockCritico(producto);

  return (
    <Card as="article" className="h-100">
      <ImagenProducto producto={producto} className="card-img-top" />

      <Card.Body className="d-flex flex-column">
        <Card.Title as="h2" className="h6">
          <Link to={`/productos/${producto.codigo}`}>{producto.nombre}</Link>
        </Card.Title>

        <Card.Text className="text-muted small mb-1">
          {producto.categoria}
        </Card.Text>

        {tieneOferta(producto) ? (
          <Card.Text className="mb-1">
            <span className="text-decoration-line-through text-muted me-2">
              {formatearPrecio(producto.precio)}
            </span>
            <span className="fw-bold text-danger">
              {formatearPrecio(precioFinal(producto))}
            </span>{" "}
            <Badge bg="danger">-{producto.descuento}%</Badge>
          </Card.Text>
        ) : (
          <Card.Text className="fw-bold mb-1">
            {formatearPrecio(producto.precio)}
          </Card.Text>
        )}

        {stockCritico && (
          <Card.Text className="text-danger fw-bold small">
            ¡Últimas {producto.stock} unidades!
          </Card.Text>
        )}

        <Button
          className="mt-auto"
          onClick={() => onAgregarCarrito(producto)}
          disabled={producto.stock === 0}
        >
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

export default TarjetaProducto;
