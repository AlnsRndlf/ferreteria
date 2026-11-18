import PanelLayout from "../../components/PanelLayout";
import EstadoCarga from "../../components/EstadoCarga";
import { useApi } from "../../hooks/useApi";
import { listarPedidos } from "../../services/boletaService";
import { listarProductos } from "../../services/productoService";
import { clientesMasFrecuentes, productosMasVendidos } from "../../utils/reportes";
import { esStockCritico, estaSinStock } from "../../utils/stock";

function Reportes() {
  const { datos, cargando, error } = useApi(
    () => Promise.all([listarProductos(), listarPedidos()]),
    []
  );
  const [productos, pedidos] = datos ?? [[], []];

  const criticos = productos.filter(esStockCritico);
  const sinStock = productos.filter(estaSinStock);
  const frecuentes = clientesMasFrecuentes(pedidos);
  const masVendidos = productosMasVendidos(pedidos);

  return (
    <PanelLayout titulo="Reportes">
      <EstadoCarga cargando={cargando} error={error}>
        <section className="mb-4">
          <h2 className="h5">Alertas de punto de reposición ({criticos.length})</h2>

          {criticos.length === 0 ? (
            <p className="text-muted">No hay productos en stock crítico.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Producto</th>
                    <th>Stock</th>
                    <th>Stock mínimo</th>
                  </tr>
                </thead>
                <tbody>
                  {criticos.map((producto) => (
                    <tr key={producto.codigo}>
                      <td>{producto.codigo}</td>
                      <td>{producto.nombre}</td>
                      <td>{producto.stock}</td>
                      <td>{producto.stockMinimo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mb-4">
          <h2 className="h5">Productos sin stock ({sinStock.length})</h2>

          {sinStock.length === 0 ? (
            <p className="text-muted">No hay productos sin stock.</p>
          ) : (
            <ul>
              {sinStock.map((producto) => (
                <li key={producto.codigo}>
                  {producto.codigo} — {producto.nombre}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mb-4">
          <h2 className="h5">10 clientes más frecuentes</h2>

          {frecuentes.length === 0 ? (
            <p className="panel-estado-vacio">
              Todavía no hay pedidos registrados para calcular este reporte.
            </p>
          ) : (
            <ol>
              {frecuentes.map((item) => (
                <li key={item.cliente}>
                  {item.cliente} — {item.totalPedidos} pedido(s)
                </li>
              ))}
            </ol>
          )}
        </section>

        <section>
          <h2 className="h5">Productos más vendidos</h2>

          {masVendidos.length === 0 ? (
            <p className="panel-estado-vacio">
              Todavía no hay ventas registradas para calcular este reporte.
            </p>
          ) : (
            <ul>
              {masVendidos.map((item) => (
                <li key={item.codigo}>
                  {item.nombre} — {item.cantidadVendida} unidades
                </li>
              ))}
            </ul>
          )}
        </section>
      </EstadoCarga>
    </PanelLayout>
  );
}

export default Reportes;
