import { useState } from "react";
import PanelLayout from "../../components/PanelLayout";
import BadgeStock from "../../components/BadgeStock";
import { obtenerProductos, actualizarStock } from "../../data/productos";

function FilaInventario({ producto, onGuardado }) {
  const [valorInput, setValorInput] = useState(producto.stock);
  const [mensaje, setMensaje] = useState("");

  function guardar() {
    let nuevoStock = Number(valorInput);

    if (!Number.isInteger(nuevoStock) || nuevoStock < 0) {
      nuevoStock = 0;
      setValorInput(0);
    }

    actualizarStock(producto.codigo, nuevoStock);
    setMensaje(`Actualizado a ${nuevoStock}.`);
    onGuardado();
  }

  return (
    <tr>
      <td>{producto.codigo}</td>
      <td>{producto.nombre}</td>
      <td>{producto.categoria}</td>
      <td>
        <input
          type="number"
          min="0"
          className="form-control form-control-sm"
          style={{ width: "6rem" }}
          value={valorInput}
          onChange={(evento) => setValorInput(evento.target.value)}
        />
      </td>
      <td>{producto.stockMinimo}</td>
      <td>
        <BadgeStock producto={producto} />
      </td>
      <td>
        <button type="button" className="panel-boton editar" onClick={guardar}>
          Guardar
        </button>
        {mensaje && <span className="small text-muted ms-2">{mensaje}</span>}
      </td>
    </tr>
  );
}

function Inventario() {
  // "version" solo se usa para forzar un refresco visual de los
  // badges después de guardar un cambio.
  const [version, setVersion] = useState(0);

  const productos = obtenerProductos();

  return (
    <PanelLayout titulo="Inventario">
      <div className="table-responsive">
        <table className="table table-hover align-middle" key={version}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Stock actual</th>
              <th>Stock mínimo</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <FilaInventario
                key={producto.codigo}
                producto={producto}
                onGuardado={() => setVersion(version + 1)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </PanelLayout>
  );
}

export default Inventario;