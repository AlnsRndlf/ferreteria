import { useState } from "react";
import { Alert, Button, Container, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useUsuarioActual } from "../hooks/useUsuarioActual";
import { obtenerUsuarios } from "../data/usuarios";
import { registrarPedido } from "../data/pedidos";
import { formatearMonto } from "../utils/precio";

const TIPOS_ENTREGA = ["Retiro en tienda", "Despacho a domicilio"];

function Carrito() {
  const { items, total, cambiarCantidad, quitar, vaciar } = useCarrito();
  const { usuario } = useUsuarioActual();
  const [tipoEntrega, setTipoEntrega] = useState(TIPOS_ENTREGA[0]);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(null);

  function confirmar() {
    const registrado = obtenerUsuarios().find(
      (item) => item.correo.toLowerCase() === usuario.correo.toLowerCase()
    );

    const pedido = registrarPedido({
      cliente: registrado ? `${registrado.nombre} ${registrado.apellidos}` : usuario.correo,
      clienteCorreo: usuario.correo,
      tipoEntrega,
      items: items.map(({ codigo, nombre, precio, cantidad }) => ({
        codigo, nombre, precio, cantidad,
      })),
    });

    vaciar();
    setPedidoConfirmado(pedido);
  }

  if (pedidoConfirmado) {
    return (
      <Container as="main" className="py-4">
        <Alert variant="success">
          <Alert.Heading>¡Pedido confirmado!</Alert.Heading>
          <p className="mb-0">
            Tu número de pedido es <strong>{pedidoConfirmado.numero}</strong> por{" "}
            {formatearMonto(pedidoConfirmado.total)} ({pedidoConfirmado.tipoEntrega}).
          </p>
        </Alert>
        <Link to="/productos">Seguir comprando</Link>
      </Container>
    );
  }

  return (
    <Container as="main" className="py-4">
      <h1 className="text-center">Tu Carrito de Compras</h1>
      <p className="text-center text-muted">
        Revisa los materiales y herramientas seleccionados antes de confirmar tu pedido.
      </p>

      {items.length === 0 ? (
        <div className="text-center py-5">
          <p>Tu carrito está vacío.</p>
          <Link to="/productos">Ir al catálogo</Link>
        </div>
      ) : (
        <>
          <Table responsive hover className="align-middle">
            <caption>Detalle de productos agregados al carrito</caption>
            <thead>
              <tr>
                <th scope="col">Código</th>
                <th scope="col">Producto</th>
                <th scope="col">Precio unit.</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Subtotal</th>
                <th scope="col"><span className="visually-hidden">Acciones</span></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.codigo}>
                  <th scope="row">{item.codigo}</th>
                  <td>{item.nombre}</td>
                  <td>{formatearMonto(item.precio)}</td>
                  <td>
                    <Form.Control
                      type="number"
                      min="1"
                      max={item.stock}
                      size="sm"
                      style={{ width: "5rem" }}
                      aria-label={`Cantidad de ${item.nombre}`}
                      value={item.cantidad}
                      onChange={(evento) =>
                        cambiarCantidad(item.codigo, Number(evento.target.value) || 1)
                      }
                    />
                  </td>
                  <td>{formatearMonto(item.precio * item.cantidad)}</td>
                  <td>
                    <Button variant="outline-danger" size="sm" onClick={() => quitar(item.codigo)}>
                      Quitar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row" colSpan={4} className="text-end">Total:</th>
                <td colSpan={2}><strong>{formatearMonto(total)}</strong></td>
              </tr>
            </tfoot>
          </Table>

          <div className="d-flex flex-wrap gap-2 mb-4">
            <Button as={Link} to="/productos" variant="outline-primary">Seguir comprando</Button>
            <Button variant="outline-secondary" onClick={vaciar}>Vaciar carrito</Button>
          </div>

          {usuario ? (
            <section className="border rounded p-3" style={{ maxWidth: "28rem" }}>
              <h2 className="h5">Confirmar pedido</h2>
              <Form.Group className="mb-3" controlId="tipoEntrega">
                <Form.Label>Tipo de entrega</Form.Label>
                <Form.Select value={tipoEntrega} onChange={(e) => setTipoEntrega(e.target.value)}>
                  {TIPOS_ENTREGA.map((tipo) => (
                    <option key={tipo}>{tipo}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Button variant="success" onClick={confirmar}>
                Confirmar pedido por {formatearMonto(total)}
              </Button>
            </section>
          ) : (
            <Alert variant="info">
              Para confirmar tu pedido <Link to="/inicio-sesion">inicia sesión</Link> o{" "}
              <Link to="/registro">crea tu cuenta</Link>.
            </Alert>
          )}
        </>
      )}
    </Container>
  );
}

export default Carrito;