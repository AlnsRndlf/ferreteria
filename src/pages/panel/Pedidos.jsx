import { useState } from "react";
import { Link } from "react-router-dom";
import PanelLayout from "../../components/PanelLayout";
import EstadoCarga from "../../components/EstadoCarga";
import { ESTADOS_PEDIDO } from "../../constants/pedidos";
import { ROLES } from "../../constants/roles";
import { useApi } from "../../hooks/useApi";
import { useUsuarioActual } from "../../hooks/useUsuarioActual";
import { cambiarEstadoPedido, listarPedidos } from "../../services/boletaService";
import { formatearMonto } from "../../utils/precio";

function FilaPedido({ pedido, puedeCambiarEstado }) {
  const [actual, setActual] = useState(pedido);
  const [error, setError] = useState("");

  async function cambiarEstado(estadoNuevo) {
    setError("");
    try {
      setActual(await cambiarEstadoPedido(actual.id, estadoNuevo));
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <tr>
      <td>
        <Link to={`/panel/pedidos/${actual.numero}`}>{actual.numero}</Link>
      </td>
      <td>{actual.cliente}</td>
      <td>{actual.fecha}</td>
      <td>{actual.tipoEntrega}</td>
      <td>{formatearMonto(actual.total)}</td>
      <td>
        {puedeCambiarEstado ? (
          <select
            className="form-select form-select-sm"
            value={actual.estado}
            onChange={(evento) => cambiarEstado(evento.target.value)}
          >
            {ESTADOS_PEDIDO.map((estado) => (
              <option key={estado}>{estado}</option>
            ))}
          </select>
        ) : (
          actual.estado
        )}
        {error && <div className="small text-danger">{error}</div>}
      </td>
    </tr>
  );
}

function Pedidos() {
  const { datos, cargando, error } = useApi(listarPedidos, []);
  const { usuario } = useUsuarioActual();

  // El Vendedor solo puede ver las órdenes; el Administrador además cambia su estado
  const puedeCambiarEstado = usuario?.tipoUsuario === ROLES.ADMINISTRADOR;
  const pedidos = datos ?? [];

  return (
    <PanelLayout titulo="Órdenes / Boletas">
      <EstadoCarga cargando={cargando} error={error}>
        {pedidos.length === 0 ? (
          <div className="panel-estado-vacio">
            <p>
              <strong>Aún no hay pedidos registrados.</strong>
            </p>
            <p>Cuando los clientes confirmen sus compras, aparecerán aquí.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
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
                    puedeCambiarEstado={puedeCambiarEstado}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </EstadoCarga>
    </PanelLayout>
  );
}

export default Pedidos;