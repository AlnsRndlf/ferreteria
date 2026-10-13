import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUsuarioActual } from "../hooks/useUsuarioActual";
import { ROLES } from "../constants/roles";

function AccesoPrueba() {
  const { usuario, iniciarSesion, cerrarSesion } = useUsuarioActual();
  const navegar = useNavigate();

  function entrarComo(correo, tipoUsuario) {
    iniciarSesion({ correo, tipoUsuario });
    navegar("/panel");
  }

  return (
    <Container as="main" className="py-5" style={{ maxWidth: "32rem" }}>
      <h1 className="h3">Acceso de prueba (temporal)</h1>
      <p>
        Esta página es solo para probar las vistas protegidas.{" "}
        <strong>Hay que borrarla antes de la entrega final.</strong>
      </p>

      <div className="d-grid gap-2">
        <Button onClick={() => entrarComo("admin@duoc.cl", ROLES.ADMINISTRADOR)}>
          Entrar como Administrador (prueba)
        </Button>
        <Button onClick={() => entrarComo("vendedor@duoc.cl", ROLES.VENDEDOR)}>
          Entrar como Vendedor (prueba)
        </Button>
        <Button variant="outline-secondary" onClick={cerrarSesion}>
          Cerrar sesión de prueba
        </Button>
      </div>

      <p className="mt-3 text-muted">
        {usuario ? `Sesión actual: ${usuario.correo} (${usuario.tipoUsuario})` : "Sin sesión iniciada."}
      </p>
    </Container>
  );
}

export default AccesoPrueba;