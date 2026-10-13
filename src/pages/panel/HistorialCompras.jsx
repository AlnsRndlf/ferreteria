import { Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import PanelLayout from "../../components/PanelLayout";
import { obtenerUsuarioPorRun } from "../../data/usuarios";
import { obtenerPedidosPorCorreo } from "../../data/pedidos";
import { formatearMonto } from "../../utils/precio";

function HistorialCompras() {
  const { run } = useParams();
  const usuario = obtenerUsuarioPorRun(run);

  if (!usuario) {
    return (
      <PanelLayout titulo="Historial de compras">
        <p className="text-danger fw-bold">El usuario solicitado no existe.</p>
        <Link to="/panel/usuarios">Volver a usuarios</Link>
      </PanelLayout>
    );
  }

  const pedidos = obtenerPedidosPorCorreo(usuario.correo);

  return (
    <PanelLayout titulo={`Historial de ${usuario.nombre} ${usuario.apellidos}`}>
      {pedidos.length === 0 ? (
        <p className="panel-estado-vacio">Este usuario todavía no tiene compras.</p>
      ) : (
        <Table responsive hover className="align-middle">
          <thead>
            <tr>
              <th>N° Pedido</th>
              <th>Fecha</th>
              <th>Entrega</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.numero}>
                <td><Link to={`/panel/pedidos/${pedido.numero}`}>{pedido.numero}</Link></td>
                <td>{pedido.fecha}</td>
                <td>{pedido.tipoEntrega}</td>
                <td>{formatearMonto(pedido.total)}</td>
                <td>{pedido.estado}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Link to="/panel/usuarios">Volver a usuarios</Link>
    </PanelLayout>
  );
}

export default HistorialCompras;
