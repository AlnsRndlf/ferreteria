import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PanelLayout from "../../components/PanelLayout";
import { obtenerUsuarios, eliminarUsuario } from "../../data/usuarios";

function UsuariosAdmin() {
  const [version, setVersion] = useState(0);
  const navegar = useNavigate();

  const usuarios = obtenerUsuarios();

  function manejarEliminar(run, nombre) {
    const confirmar = window.confirm(`¿Eliminar al usuario "${nombre}"?`);

    if (confirmar) {
      eliminarUsuario(run);
      setVersion(version + 1);
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

      <div className="table-responsive">
        <table className="table table-hover align-middle" key={version}>
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
            {usuarios.length === 0 && (
              <tr>
                <td colSpan={5}>
                  Todavía no hay usuarios registrados (ni desde el registro
                  público ni desde acá).
                </td>
              </tr>
            )}

            {usuarios.map((usuario) => (
              <tr key={usuario.run}>
                <td>{usuario.run}</td>
                <td>
                  {usuario.nombre} {usuario.apellidos}
                </td>
                <td>{usuario.correo}</td>
                <td>{usuario.tipoUsuario}</td>
                <td>
                  <button
                    type="button"
                    className="panel-boton editar me-1"
                    onClick={() => navegar(`/panel/usuarios/${usuario.run}/historial`)}
                  >
                    Historial
                  </button>
                  <button
                    type="button"
                    className="panel-boton editar me-1"
                    onClick={() => navegar(`/panel/usuarios/editar/${usuario.run}`)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="panel-boton eliminar"
                    onClick={() =>
                      manejarEliminar(usuario.run, `${usuario.nombre} ${usuario.apellidos}`)
                    }
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

export default UsuariosAdmin;
