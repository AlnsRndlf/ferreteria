import PanelLayout from "../../components/PanelLayout";
import TarjetaResumen from "../../components/TarjetaResumen";
import { useUsuarioActual } from "../../hooks/useUsuarioActual";
import { obtenerProductos, obtenerProductosCriticos } from "../../data/productos";
import { obtenerUsuarios } from "../../data/usuarios";
import { obtenerPedidos } from "../../data/pedidos";

function DashboardAdmin() {
  const { usuario } = useUsuarioActual();

  const totalProductos = obtenerProductos().length;
  const totalCriticos = obtenerProductosCriticos().length;
  const totalUsuarios = obtenerUsuarios().length;
  const totalPedidos = obtenerPedidos().length;

  return (
    <PanelLayout titulo="Dashboard">
      <div className="panel-tarjetas-resumen">
        <TarjetaResumen valor={totalProductos} etiqueta="Productos en catálogo" />
        <TarjetaResumen
          valor={totalCriticos}
          etiqueta="Productos con stock crítico"
          alerta={totalCriticos > 0}
        />
        <TarjetaResumen valor={totalUsuarios} etiqueta="Usuarios registrados" />
        <TarjetaResumen valor={totalPedidos} etiqueta="Pedidos recibidos" />
      </div>

      {usuario && (
        <p className="panel-estado-vacio">
          Hola, {usuario.correo}. Tu rol es {usuario.tipoUsuario}.
        </p>
      )}
    </PanelLayout>
  );
}

export default DashboardAdmin;
