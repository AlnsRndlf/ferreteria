import PanelLayout from "../../components/PanelLayout";
import EstadoCarga from "../../components/EstadoCarga";
import { useApi } from "../../hooks/useApi";
import { obtenerPerfil } from "../../services/usuarioService";

function Perfil() {
  const { datos: perfil, cargando, error } = useApi(obtenerPerfil, []);

  return (
    <PanelLayout titulo="Mi perfil">
      <EstadoCarga cargando={cargando} error={error}>
        {perfil && (
          <dl className="row">
            <dt className="col-sm-3">Nombre</dt>
            <dd className="col-sm-9">{perfil.nombre} {perfil.apellidos}</dd>
            <dt className="col-sm-3">RUN</dt>
            <dd className="col-sm-9">{perfil.run || "—"}</dd>
            <dt className="col-sm-3">Correo</dt>
            <dd className="col-sm-9">{perfil.correo}</dd>
            <dt className="col-sm-3">Rol</dt>
            <dd className="col-sm-9">{perfil.tipoUsuario}</dd>
            <dt className="col-sm-3">Región</dt>
            <dd className="col-sm-9">{perfil.region || "—"}</dd>
            <dt className="col-sm-3">Comuna</dt>
            <dd className="col-sm-9">{perfil.comuna || "—"}</dd>
            <dt className="col-sm-3">Dirección</dt>
            <dd className="col-sm-9">{perfil.direccion || "—"}</dd>
          </dl>
        )}
      </EstadoCarga>
    </PanelLayout>
  );
}

export default Perfil;
