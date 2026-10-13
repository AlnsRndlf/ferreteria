import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import PanelLayout from "../../components/PanelLayout";
import BadgeStock from "../../components/BadgeStock";
import { obtenerProductos } from "../../data/productos";
import { esStockCritico, estaSinStock } from "../../utils/stock";

function ProductosCriticos() {
  const aReponer = obtenerProductos().filter(
    (producto) => esStockCritico(producto) || estaSinStock(producto)
  );

  return (
    <PanelLayout titulo="Productos críticos">
      <p className="text-muted">
        Productos con stock igual o bajo el mínimo, o sin stock. Para
        actualizar las cantidades ve a <Link to="/panel/inventario">Inventario</Link>.
      </p>

      {aReponer.length === 0 ? (
        <p className="panel-estado-vacio">No hay productos que reponer.</p>
      ) : (
        <Table responsive hover className="align-middle">
          <thead>
            <tr>
              <th>Código</th>
              <th>Producto</th>
              <th>Stock</th>
              <th>Stock mínimo</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {aReponer.map((producto) => (
              <tr key={producto.codigo}>
                <td>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td>{producto.stock}</td>
                <td>{producto.stockMinimo}</td>
                <td><BadgeStock producto={producto} /></td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </PanelLayout>
  );
}

export default ProductosCriticos;