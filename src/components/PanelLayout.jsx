import { NavLink } from "react-router-dom";
import { useUsuarioActual } from "../hooks/useUsuarioActual";
import { ITEMS_MENU_PANEL } from "../constants/menuPanel";
import { ROLES } from "../constants/roles";


function PanelLayout({ titulo, children }) {
  const { usuario, cerrarSesion } = useUsuarioActual();

  const esAdministrador = usuario && usuario.tipoUsuario === ROLES.ADMINISTRADOR;

  return (
    <div className="panel-administrativo">
      <aside className="panel-sidebar">
        <p className="panel-sidebar-titulo">Ferretería Los Maestros</p>

        <nav aria-label="Panel administrativo">
          <ul className="panel-sidebar-menu">
            {ITEMS_MENU_PANEL.filter((item) => !item.soloAdmin || esAdministrador).map(
              (item) => (
                <li key={item.ruta}>
                  <NavLink to={item.ruta} end={item.ruta === "/panel" || item.ruta === "/panel/productos"}>
                    {item.texto}
                  </NavLink>
                </li>
              )
            )}
          </ul>

          <hr className="panel-sidebar-separador" />

          <ul className="panel-sidebar-menu">
            <li>
              <NavLink to="/">Ver tienda</NavLink>
            </li>
            <li>
              <button type="button" onClick={cerrarSesion}>
                Cerrar sesión
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="panel-contenido">
        <div className="panel-encabezado">
          <h1>{titulo}</h1>
        </div>

        {children}
      </main>
    </div>
  );
}

export default PanelLayout;
