import { Route, Routes } from "react-router-dom";
import LayoutPublico from "./components/layout/LayoutPublico";
import RutaProtegida from "./components/RutaProtegida";
import { ROLES_PANEL, ROLES_SOLO_ADMIN } from "./constants/roles";

// ---- Tienda (pública) ----
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import DetalleProducto from "./pages/DetalleProducto";
import Categorias from "./pages/Categorias";
import Ofertas from "./pages/Ofertas";
import Blog from "./pages/Blog";
import Carrito from "./pages/Carrito";
import InicioSesion from "./pages/InicioSesion";
import Registro from "./pages/Registro";
import AccesoPrueba from "./pages/AccesoPrueba";
import NoEncontrada from "./pages/NoEncontrada";

// ---- Panel (Vendedor / Administrador) ----
import DashboardAdmin from "./pages/panel/DashboardAdmin";
import Inventario from "./pages/panel/Inventario";
import Pedidos from "./pages/panel/Pedidos";
import Boleta from "./pages/panel/Boleta";
import ProductosCriticos from "./pages/panel/ProductosCriticos";
import Perfil from "./pages/panel/Perfil";
import ProductosAdmin from "./pages/panel/ProductosAdmin";
import ProductoForm from "./pages/panel/ProductoForm";
import CategoriasAdmin from "./pages/panel/CategoriasAdmin";
import CategoriaForm from "./pages/panel/CategoriaForm";
import UsuariosAdmin from "./pages/panel/UsuariosAdmin";
import UsuarioForm from "./pages/panel/UsuarioForm";
import HistorialCompras from "./pages/panel/HistorialCompras";
import Reportes from "./pages/panel/Reportes";

// Envuelve una página del panel con el control de acceso por rol.
function Protegida({ roles, children }) {
  return <RutaProtegida rolesPermitidos={roles}>{children}</RutaProtegida>;
}

function App() {
  return (
    <Routes>
      {/* ---- Tienda: comparten barra y pie (LayoutPublico) ---- */}
      <Route element={<LayoutPublico />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Catalogo />} />
        <Route path="/productos/:codigo" element={<DetalleProducto />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/categorias/:nombre" element={<Categorias />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        {/* TEMPORAL: borrar antes de la entrega final */}
        <Route path="/acceso-prueba" element={<AccesoPrueba />} />
      </Route>

      {/* ---- Panel: Vendedor + Administrador ---- */}
      <Route path="/panel" element={<Protegida roles={ROLES_PANEL}><DashboardAdmin /></Protegida>} />
      <Route path="/panel/inventario" element={<Protegida roles={ROLES_PANEL}><Inventario /></Protegida>} />
      <Route path="/panel/pedidos" element={<Protegida roles={ROLES_PANEL}><Pedidos /></Protegida>} />
      <Route path="/panel/pedidos/:numero" element={<Protegida roles={ROLES_PANEL}><Boleta /></Protegida>} />
      <Route path="/panel/productos/criticos" element={<Protegida roles={ROLES_PANEL}><ProductosCriticos /></Protegida>} />
      <Route path="/panel/perfil" element={<Protegida roles={ROLES_PANEL}><Perfil /></Protegida>} />

      {/* ---- Panel: solo Administrador ---- */}
      <Route path="/panel/productos" element={<Protegida roles={ROLES_SOLO_ADMIN}><ProductosAdmin /></Protegida>} />
      <Route path="/panel/productos/nuevo" element={<Protegida roles={ROLES_SOLO_ADMIN}><ProductoForm /></Protegida>} />
      <Route path="/panel/productos/editar/:codigo" element={<Protegida roles={ROLES_SOLO_ADMIN}><ProductoForm /></Protegida>} />
      <Route path="/panel/categorias" element={<Protegida roles={ROLES_SOLO_ADMIN}><CategoriasAdmin /></Protegida>} />
      <Route path="/panel/categorias/nueva" element={<Protegida roles={ROLES_SOLO_ADMIN}><CategoriaForm /></Protegida>} />
      <Route path="/panel/categorias/editar/:id" element={<Protegida roles={ROLES_SOLO_ADMIN}><CategoriaForm /></Protegida>} />
      <Route path="/panel/usuarios" element={<Protegida roles={ROLES_SOLO_ADMIN}><UsuariosAdmin /></Protegida>} />
      <Route path="/panel/usuarios/nuevo" element={<Protegida roles={ROLES_SOLO_ADMIN}><UsuarioForm /></Protegida>} />
      <Route path="/panel/usuarios/editar/:run" element={<Protegida roles={ROLES_SOLO_ADMIN}><UsuarioForm /></Protegida>} />
      <Route path="/panel/usuarios/:run/historial" element={<Protegida roles={ROLES_SOLO_ADMIN}><HistorialCompras /></Protegida>} />
      <Route path="/panel/reportes" element={<Protegida roles={ROLES_SOLO_ADMIN}><Reportes /></Protegida>} />

      {/* ---- Cualquier otra dirección ---- */}
      <Route path="*" element={<NoEncontrada />} />
    </Routes>
  );
}

export default App;