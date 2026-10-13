import PanelLayout from "../../components/PanelLayout";
import { obtenerPedidos, actualizarPedido } from "../../data/pedidos";
import { formatearMonto } from "../../utils/precio";
import { ESTADOS_PEDIDO } from "../../constants/pedidos";
import { useState } from "react";
import { Link } from "react-router-dom";

function FilaPedido({ pedido, onCambiarEstado }) {
  return (
    <tr>
      <td>
        <Link to={`/panel/pedidos/${pedido.numero}`}>{pedido.numero}</Link>
      </td>
      <td>{pedido.cliente}</td>
      <td>{pedido.fecha}</td>
      <td>{pedido.tipoEntrega}</td>
      <td>{formatearMonto(pedido.total)}</td>
      <td>
        <select
          className="form-select form-select-sm"
          value={pedido.estado}
          onChange={(evento) => onCambiarEstado(pedido.numero, evento.target.value)}
        >
          {ESTADOS_PEDIDO.map((estado) => (
            <option key={estado}>{estado}</option>
          ))}
        </select>
      </td>
    </tr>
  );
}

function Pedidos() {
  const [version, setVersion] = useState(0);
  const pedidos = obtenerPedidos();

  function cambiarEstado(numero, estadoNuevo) {
    actualizarPedido(numero, { estado: estadoNuevo });
    setVersion(version + 1);
  }

  return (
    <PanelLayout titulo="Órdenes / Boletas">
      {pedidos.length === 0 ? (
        <div className="panel-estado-vacio">
          <p>
            <strong>Aún no hay pedidos registrados.</strong>
          </p>
          <p>
            Esta vista se llena sola apenas el carrito/checkout empiece a
            guardar pedidos en localStorage (clave <code>pedidos</code>).
          </p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle" key={version}>
            <thead>
              <tr>
                <th>N° Pedido</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Tipo entrega</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <FilaPedido
                  key={pedido.numero}
                  pedido={pedido}
                  onCambiarEstado={cambiarEstado}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PanelLayout>
  );
}

export default Pedidos;