import { Button, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import PanelLayout from "../../components/PanelLayout";
import EstadoCarga from "../../components/EstadoCarga";
import { useApi } from "../../hooks/useApi";
import { obtenerPedidoPorNumero } from "../../services/boletaService";
import { formatearMonto } from "../../utils/precio";

function Boleta() {
  const { numero } = useParams();
  const { datos: pedido, cargando, error } = useApi(
    () => obtenerPedidoPorNumero(numero),
    [numero]
  );

  return (
    <PanelLayout titulo={pedido ? `Boleta ${pedido.numero}` : "Boleta"}>
      <EstadoCarga cargando={cargando} error={error}>
        {!pedido ? (
          <>
            <p className="text-danger fw-bold">El pedido solicitado no existe.</p>
            <Link to="/panel/pedidos">Volver a pedidos</Link>
          </>
        ) : (
          <>
            <dl className="row">
              <dt className="col-sm-3">Cliente</dt>
              <dd className="col-sm-9">{pedido.cliente} ({pedido.clienteCorreo})</dd>
              <dt className="col-sm-3">Fecha</dt>
              <dd className="col-sm-9">{pedido.fecha}</dd>
              <dt className="col-sm-3">Entrega</dt>
              <dd className="col-sm-9">{pedido.tipoEntrega}</dd>
              <dt className="col-sm-3">Estado</dt>
              <dd className="col-sm-9">{pedido.estado}</dd>
            </dl>

            <Table responsive hover className="align-middle">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {pedido.items.map((item) => (
                  <tr key={item.codigo}>
                    <td>{item.codigo}</td>
                    <td>{item.nombre}</td>
                    <td>{formatearMonto(item.precio)}</td>
                    <td>{item.cantidad}</td>
                    <td>{formatearMonto(item.precio * item.cantidad)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={4} className="text-end">Total pagado:</th>
                  <td><strong>{formatearMonto(pedido.total)}</strong></td>
                </tr>
              </tfoot>
            </Table>

            <div className="d-flex gap-2">
              <Button variant="outline-secondary" onClick={() => window.print()}>
                Imprimir boleta
              </Button>
              <Button as={Link} to="/panel/pedidos" variant="outline-primary">
                Volver a pedidos
              </Button>
            </div>
          </>
        )}
      </EstadoCarga>
    </PanelLayout>
  );
}

export default Boleta;