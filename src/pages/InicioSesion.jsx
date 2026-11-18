import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CampoFormulario from "../components/CampoFormulario";
import { useUsuarioActual } from "../hooks/useUsuarioActual";
import { login } from "../services/authService";
import { ROLES } from "../constants/roles";
import { validarLogin } from "../utils/validaciones";

// A dónde se envía a cada rol después de iniciar sesión
function rutaInicial(tipoUsuario) {
  if (tipoUsuario === ROLES.ADMINISTRADOR) return "/panel";
  if (tipoUsuario === ROLES.VENDEDOR) return "/panel/pedidos";
  return "/";
}

function InicioSesion() {
  const [datos, setDatos] = useState({ correo: "", contrasena: "" });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [enviando, setEnviando] = useState(false);
  const { iniciarSesion } = useUsuarioActual();
  const navegar = useNavigate();

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos({ ...datos, [name]: value });
  }

  async function enviar(evento) {
    evento.preventDefault();

    const nuevosErrores = validarLogin(datos);
    setErrores(nuevosErrores);
    setErrorGeneral("");

    if (Object.keys(nuevosErrores).length > 0) return;

    setEnviando(true);
    try {
      const usuario = await login(datos.correo.trim(), datos.contrasena);
      iniciarSesion(usuario);
      navegar(rutaInicial(usuario.tipoUsuario));
    } catch (error) {
      setErrorGeneral(
        error.status === 401 ? "Correo o contraseña incorrectos." : error.message
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Container as="main" className="py-5" style={{ maxWidth: "28rem" }}>
      <h1 className="h3">Iniciar sesión</h1>
      <p className="text-muted">Ingresa tus datos para acceder a tu cuenta.</p>

      {errorGeneral && <Alert variant="danger">{errorGeneral}</Alert>}

      <Form onSubmit={enviar} noValidate>
        <CampoFormulario
          nombre="correo" etiqueta="Correo electrónico" type="email"
          valor={datos.correo} error={errores.correo} onChange={cambiar}
          placeholder="ejemplo@duoc.cl" autoComplete="email"
        />
        <CampoFormulario
          nombre="contrasena" etiqueta="Contraseña" type="password"
          valor={datos.contrasena} error={errores.contrasena} onChange={cambiar}
          autoComplete="current-password"
        />
        <Button type="submit" className="w-100" disabled={enviando}>
          {enviando ? "Ingresando..." : "Iniciar sesión"}
        </Button>
      </Form>

      <p className="mt-3">
        ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
      </p>
    </Container>
  );
}

export default InicioSesion;