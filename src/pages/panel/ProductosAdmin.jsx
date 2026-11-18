import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EstadoCarga from "../../components/EstadoCarga";
import PanelLayout from "../../components/PanelLayout";
import { useApi } from "../../hooks/useApi";
import { eliminarProducto, listarProductos } from "../../services/productoService";
import { formatearPrecio } from "../../utils/precio";

function ProductosAdmin() {
  const navegar = useNavigate();
  const { datos, cargando, error, recargar } = useApi(listarProductos, []);
  const [errorAccion, setErrorAccion] = useState("");

  const productos = datos ?? [];

  async function manejarEliminar(producto) {
    const confirmar = window.confirm(`¿Eliminar "${producto.nombre}" del catálogo?`);
    if (!confirmar) return;

    setErrorAccion("");
    try {
      await eliminarProducto(producto.id);
      recargar();
    } catch (e) {
      setErrorAccion(
        e.status === 409
          ? `No se puede eliminar "${producto.nombre}" porque ya aparece en boletas (ventas).`
          : e.message
      );
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

      {errorAccion && <Alert variant="danger" className="mt-3">{errorAccion}</Alert>}

      <EstadoCarga cargando={cargando} error={error}>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
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
                      onClick={() => manejarEliminar(producto)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </EstadoCarga>
    </PanelLayout>
  );
}

export default ProductosAdmin;