import { Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import EstadoCarga from "../../components/EstadoCarga";
import PanelLayout from "../../components/PanelLayout";
import { useApi } from "../../hooks/useApi";
import { listarPedidosPorCorreo } from "../../services/boletaService";
import { obtenerUsuario } from "../../services/usuarioService";
import { formatearMonto } from "../../utils/precio";

// Primero se busca al usuario (servicio de auth) y con su correo sus boletas (servicio de la tienda)
async function cargarHistorial(id) {
  const usuario = await obtenerUsuario(id);
  const pedidos = await listarPedidosPorCorreo(usuario.correo);
  return { usuario, pedidos };
}

function HistorialCompras() {
  const { id } = useParams();
  const { datos, cargando, error } = useApi(() => cargarHistorial(id), [id]);

  const usuario = datos?.usuario;
  const pedidos = datos?.pedidos ?? [];

  return (
    <PanelLayout
      titulo={usuario ? `Historial de ${usuario.nombre} ${usuario.apellidos}` : "Historial de compras"}
    >
      <EstadoCarga cargando={cargando} error={error}>
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
      </EstadoCarga>

      <Link to="/panel/usuarios">Volver a usuarios</Link>
    </PanelLayout>
  );
}

export default HistorialCompras;

