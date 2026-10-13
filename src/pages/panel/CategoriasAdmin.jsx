import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PanelLayout from "../../components/PanelLayout";
import { obtenerCategorias, eliminarCategoria } from "../../data/categorias";

function CategoriasAdmin() {
  const [version, setVersion] = useState(0);
  const navegar = useNavigate();

  const categorias = obtenerCategorias();

  function manejarEliminar(id, nombre) {
    const confirmar = window.confirm(`¿Eliminar la categoría "${nombre}"?`);

    if (confirmar) {
      eliminarCategoria(id);
      setVersion(version + 1);
    }
  }

  return (
    <PanelLayout titulo="Categorías">
      <button
        type="button"
        className="panel-boton nuevo"
        onClick={() => navegar("/panel/categorias/nueva")}
      >
        + Nueva categoría
      </button>

      <div className="table-responsive">
        <table className="table table-hover align-middle" key={version}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>
                <td>
                  <button
                    type="button"
                    className="panel-boton editar me-1"
                    onClick={() => navegar(`/panel/categorias/editar/${categoria.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="panel-boton eliminar"
                    onClick={() => manejarEliminar(categoria.id, categoria.nombre)}
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

export default CategoriasAdmin;
