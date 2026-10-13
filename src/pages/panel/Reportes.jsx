import PanelLayout from "../../components/PanelLayout";
import {
  obtenerProductosCriticos,
  obtenerProductosSinStock,
} from "../../data/productos";
import {
  obtenerClientesMasFrecuentes,
  obtenerProductosMasVendidos,
} from "../../data/pedidos";

function Reportes() {
  const criticos = obtenerProductosCriticos();
  const sinStock = obtenerProductosSinStock();
  const clientesFrecuentes = obtenerClientesMasFrecuentes();
  const masVendidos = obtenerProductosMasVendidos();

  return (
    <PanelLayout titulo="Reportes">
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

        {clientesFrecuentes.length === 0 ? (
          <p className="panel-estado-vacio">
            Todavía no hay pedidos registrados para calcular este reporte.
          </p>
        ) : (
          <ol>
            {clientesFrecuentes.map((item) => (
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
            Este reporte se completa cuando el checkout guarde el detalle de
            productos comprados en cada pedido (todavía no existe esa parte).
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
    </PanelLayout>
  );
}

export default Reportes;
