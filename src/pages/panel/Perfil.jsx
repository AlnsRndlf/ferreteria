import PanelLayout from "../../components/PanelLayout";
import { useUsuarioActual } from "../../hooks/useUsuarioActual";
import { obtenerUsuarios } from "../../data/usuarios";

function Perfil() {
  const { usuario } = useUsuarioActual();

  // Si la persona se registró, se muestran también sus datos completos.
  const registrado = usuario
    ? obtenerUsuarios().find(
        (item) => item.correo.toLowerCase() === usuario.correo.toLowerCase()
      )
    : null;

  return (
    <PanelLayout titulo="Mi perfil">
      <dl className="row">
        <dt className="col-sm-3">Nombre</dt>
        <dd className="col-sm-9">{usuario ? usuario.nombre : "—"}</dd>
        <dt className="col-sm-3">Correo</dt>
        <dd className="col-sm-9">{usuario ? usuario.correo : "—"}</dd>
        <dt className="col-sm-3">Rol</dt>
        <dd className="col-sm-9">{usuario ? usuario.tipoUsuario : "—"}</dd>

        {registrado && (
          <>
            <dt className="col-sm-3">Nombre</dt>
            <dd className="col-sm-9">{registrado.nombre} {registrado.apellidos}</dd>
            <dt className="col-sm-3">RUN</dt>
            <dd className="col-sm-9">{registrado.run}</dd>
            <dt className="col-sm-3">Dirección</dt>
            <dd className="col-sm-9">
              {registrado.direccion}, {registrado.comuna}, {registrado.region}
            </dd>
          </>
        )}
      </dl>

      {!registrado && (
        <p className="text-muted">
          Por ahora solo se guardan en el servidor tu nombre, correo y rol.
        </p>
      )}
    </PanelLayout>
  );
}

export default Perfil;