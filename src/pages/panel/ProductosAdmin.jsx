import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PanelLayout from "../../components/PanelLayout";
import { obtenerProductos, eliminarProducto } from "../../data/productos";
import { formatearPrecio } from "../../utils/precio";

function ProductosAdmin() {
  const [version, setVersion] = useState(0);
  const navegar = useNavigate();

  const productos = obtenerProductos();

  function manejarEliminar(codigo, nombre) {
    const confirmar = window.confirm(`¿Eliminar "${nombre}" del catálogo?`);

    if (confirmar) {
      eliminarProducto(codigo);
      setVersion(version + 1);
    }
  }

  return (
    <PanelLayout titulo="Productos">
      <button
        type="button"
        className="panel-boton nuevo"
        onClick={() => navegar("/panel/productos/nuevo")}
      >
        + Nuevo producto
      </button>

      <div className="table-responsive">
        <table className="table table-hover align-middle" key={version}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.codigo}>
                <td>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>{formatearPrecio(producto.precio)}</td>
                <td>{producto.stock}</td>
                <td>
                  <button
                    type="button"
                    className="panel-boton editar me-1"
                    onClick={() => navegar(`/panel/productos/editar/${producto.codigo}`)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="panel-boton eliminar"
                    onClick={() => manejarEliminar(producto.codigo, producto.nombre)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelLayout>
  );
}

export default ProductosAdmin;
