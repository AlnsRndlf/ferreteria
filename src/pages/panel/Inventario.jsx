import { useState } from "react";
import PanelLayout from "../../components/PanelLayout";
import BadgeStock from "../../components/BadgeStock";
import EstadoCarga from "../../components/EstadoCarga";
import { ROLES } from "../../constants/roles";
import { useApi } from "../../hooks/useApi";
import { useUsuarioActual } from "../../hooks/useUsuarioActual";
import { actualizarStock, listarProductos } from "../../services/productoService";

function FilaInventario({ producto, puedeEditar }) {
  const [actual, setActual] = useState(producto);
  const [valorInput, setValorInput] = useState(producto.stock);
  const [mensaje, setMensaje] = useState("");

  async function guardar() {
    let nuevoStock = Number(valorInput);

    if (!Number.isInteger(nuevoStock) || nuevoStock < 0) {
      nuevoStock = 0;
      setValorInput(0);
    }

    try {
      const actualizado = await actualizarStock(actual, nuevoStock);
      setActual(actualizado);
      setMensaje(`Actualizado a ${nuevoStock}.`);
    } catch (error) {
      setMensaje(error.message);
    }
  }

  return (
    <tr>
      <td>{actual.codigo}</td>
      <td>{actual.nombre}</td>
      <td>{actual.categoria}</td>
      <td>
        {puedeEditar ? (
          <input
            type="number"
            min="0"
            className="form-control form-control-sm"
            style={{ width: "6rem" }}
            value={valorInput}
            onChange={(evento) => setValorInput(evento.target.value)}
          />
        ) : (
          actual.stock
        )}
      </td>
      <td>{actual.stockMinimo}</td>
      <td>
        <BadgeStock producto={actual} />
      </td>
      {puedeEditar && (
        <td>
          <button type="button" className="panel-boton editar" onClick={guardar}>
            Guardar
          </button>
          {mensaje && <span className="small text-muted ms-2">{mensaje}</span>}
        </td>
      )}
    </tr>
  );
}

function Inventario() {
  const { datos, cargando, error } = useApi(listarProductos, []);
  const { usuario } = useUsuarioActual();

  // El Vendedor solo puede ver el inventario; únicamente el Administrador lo modifica
  const puedeEditar = usuario?.tipoUsuario === ROLES.ADMINISTRADOR;
  const productos = datos ?? [];

  return (
    <PanelLayout titulo="Inventario">
      <EstadoCarga cargando={cargando} error={error}>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Código</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Stock actual</th>
                <th>Stock mínimo</th>
                <th>Estado</th>
                {puedeEditar && <th>Acción</th>}
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <FilaInventario
                  key={producto.codigo}
                  producto={producto}
                  puedeEditar={puedeEditar}
                />
              ))}
            </tbody>
          </table>
        </div>
      </EstadoCarga>
    </PanelLayout>
  );
}

export default Inventario;