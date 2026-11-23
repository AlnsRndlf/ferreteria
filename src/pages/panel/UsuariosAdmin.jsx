import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EstadoCarga from "../../components/EstadoCarga";
import PanelLayout from "../../components/PanelLayout";
import { useApi } from "../../hooks/useApi";
import { eliminarUsuario, listarUsuarios } from "../../services/usuarioService";

function UsuariosAdmin() {
  const navegar = useNavigate();
  const { datos, cargando, error, recargar } = useApi(listarUsuarios, []);
  const [errorAccion, setErrorAccion] = useState("");

  const usuarios = datos ?? [];

  async function manejarEliminar(usuario) {
    const nombre = `${usuario.nombre} ${usuario.apellidos}`.trim();
    if (!window.confirm(`¿Eliminar al usuario "${nombre}"?`)) return;

    setErrorAccion("");
    try {
      await eliminarUsuario(usuario.id);
      recargar();
    } catch (e) {
      setErrorAccion(e.message);
    }
  }

  return (
    <PanelLayout titulo="Usuarios">
      <button
        type="button"
        className="panel-boton nuevo"
        onClick={() => navegar("/panel/usuarios/nuevo")}
      >
        + Nuevo usuario
      </button>

      {errorAccion && <Alert variant="danger" className="mt-3">{errorAccion}</Alert>}

      <EstadoCarga cargando={cargando} error={error}>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>RUN</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Tipo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.run || "—"}</td>
                  <td>
                    {usuario.nombre} {usuario.apellidos}
                  </td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.tipoUsuario}</td>
                  <td>
                    <button
                      type="button"
                      className="panel-boton editar me-1"
                      onClick={() => navegar(`/panel/usuarios/${usuario.id}/historial`)}
                    >
                      Historial
                    </button>
                    <button
                      type="button"
                      className="panel-boton editar me-1"
                      onClick={() => navegar(`/panel/usuarios/editar/${usuario.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="panel-boton eliminar"
                      onClick={() => manejarEliminar(usuario)}
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

export default UsuariosAdmin;

