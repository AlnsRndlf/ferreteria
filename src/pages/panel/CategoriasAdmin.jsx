import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EstadoCarga from "../../components/EstadoCarga";
import PanelLayout from "../../components/PanelLayout";
import { useApi } from "../../hooks/useApi";
import { eliminarCategoria, listarCategorias } from "../../services/categoriaService";

function CategoriasAdmin() {
  const navegar = useNavigate();
  const { datos, cargando, error, recargar } = useApi(listarCategorias, []);
  const [errorAccion, setErrorAccion] = useState("");

  const categorias = datos ?? [];

  async function manejarEliminar(categoria) {
    const confirmar = window.confirm(`¿Eliminar la categoría "${categoria.nombre}"?`);
    if (!confirmar) return;

    setErrorAccion("");
    try {
      await eliminarCategoria(categoria.id);
      recargar();
    } catch (e) {
      setErrorAccion(
        e.status === 409
          ? `No se puede eliminar "${categoria.nombre}" porque todavía tiene productos.`
          : e.message
      );
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

      {errorAccion && <Alert variant="danger" className="mt-3">{errorAccion}</Alert>}

      <EstadoCarga cargando={cargando} error={error}>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
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
                      onClick={() => manejarEliminar(categoria)}
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

export default CategoriasAdmin;
