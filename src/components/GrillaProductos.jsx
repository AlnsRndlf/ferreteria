import { Col, Row } from "react-bootstrap";
import TarjetaProducto from "./TarjetaProducto";

function GrillaProductos({ productos, onAgregarCarrito }) {
  return (
    <Row className="g-4">
      {productos.map((producto) => (
        <Col xs={12} md={6} xl={3} key={producto.codigo}>
          <TarjetaProducto producto={producto} onAgregarCarrito={onAgregarCarrito} />
        </Col>
      ))}
    </Row>
  );
}

export default GrillaProductos;