import PanelLayout from "../../components/PanelLayout";
import TarjetaResumen from "../../components/TarjetaResumen";
import EstadoCarga from "../../components/EstadoCarga";
import { useApi } from "../../hooks/useApi";
import { useUsuarioActual } from "../../hooks/useUsuarioActual";
import { listarPedidos } from "../../services/boletaService";
import { listarProductos } from "../../services/productoService";
import { formatearMonto } from "../../utils/precio";
import { esStockCritico, estaSinStock } from "../../utils/stock";

function DashboardAdmin() {
  const { usuario } = useUsuarioActual();
  const { datos, cargando, error } = useApi(
    () => Promise.all([listarProductos(), listarPedidos()]),
    []
  );
  const [productos, pedidos] = datos ?? [[], []];

  const totalCriticos = productos.filter(
    (producto) => esStockCritico(producto) || estaSinStock(producto)
  ).length;
  const ventasTotales = pedidos.reduce((suma, pedido) => suma + pedido.total, 0);

  return (
    <PanelLayout titulo="Dashboard">
      <EstadoCarga cargando={cargando} error={error}>
        <div className="panel-tarjetas-resumen">
          <TarjetaResumen valor={productos.length} etiqueta="Productos en catálogo" />
          <TarjetaResumen
            valor={totalCriticos}
            etiqueta="Productos con stock crítico"
            alerta={totalCriticos > 0}
          />
          <TarjetaResumen valor={pedidos.length} etiqueta="Pedidos recibidos" />
          <TarjetaResumen valor={formatearMonto(ventasTotales)} etiqueta="Ventas totales" />
        </div>
      </EstadoCarga>

      {usuario && (
        <p className="panel-estado-vacio">
          Hola, {usuario.correo}. Tu rol es {usuario.tipoUsuario}.
        </p>
      )}
    </PanelLayout>
  );
}

export default DashboardAdmin;
