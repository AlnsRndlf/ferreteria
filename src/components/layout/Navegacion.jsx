import { useState } from "react";
import { Button, Container, Form, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import { useUsuarioActual } from "../../hooks/useUsuarioActual";
import { obtenerCategorias } from "../../data/productos";
import { ROLES_PANEL } from "../../constants/roles";
import { formatearMonto } from "../../utils/precio";

function Navegacion() {
  const [busqueda, setBusqueda] = useState("");
  const navegar = useNavigate();
  const { total } = useCarrito();
  const { usuario, cerrarSesion } = useUsuarioActual();

  function buscar(evento) {
    evento.preventDefault();
    const texto = busqueda.trim();
    navegar(texto ? `/productos?q=${encodeURIComponent(texto)}` : "/productos");
  }

  const puedeEntrarAlPanel = usuario && ROLES_PANEL.includes(usuario.tipoUsuario);

  return (
    <Navbar expand="lg" bg="light" className="border-bottom shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Ferretería Los Maestros
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="menu-principal" />

        <Navbar.Collapse id="menu-principal">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>

            <NavDropdown title="Categorías" id="menu-categorias">
              <NavDropdown.Item as={Link} to="/categorias">
                Todas las categorías
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {obtenerCategorias().map((categoria) => (
                <NavDropdown.Item
                  as={Link}
                  key={categoria}
                  to={`/categorias/${encodeURIComponent(categoria)}`}
                >
                  {categoria}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <Nav.Link as={NavLink} to="/ofertas">Ofertas</Nav.Link>
            <Nav.Link as={NavLink} to="/blog">Blog y Nosotros</Nav.Link>
          </Nav>

          <Form className="d-flex me-lg-3 my-2 my-lg-0" onSubmit={buscar} role="search">
            <Form.Control
              type="search"
              placeholder="Buscar producto"
              aria-label="Buscar producto"
              className="me-2"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
            />
            <Button type="submit" variant="outline-success">Buscar</Button>
          </Form>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            <Button as={Link} to="/carrito" variant="success" size="sm">
              🛒 Carrito {formatearMonto(total)}
            </Button>

            {usuario ? (
              <>
                {puedeEntrarAlPanel && (
                  <Button as={Link} to="/panel" variant="outline-primary" size="sm">
                    Panel
                  </Button>
                )}
                <span className="small text-muted">{usuario.correo}</span>
                <Button variant="outline-secondary" size="sm" onClick={cerrarSesion}>
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Button as={Link} to="/inicio-sesion" variant="outline-primary" size="sm">
                  Iniciar sesión
                </Button>
                <Button as={Link} to="/registro" variant="primary" size="sm">
                  Crear cuenta
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegacion;