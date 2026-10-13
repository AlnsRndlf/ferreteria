import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CampoFormulario from "../components/CampoFormulario";
import { useUsuarioActual } from "../hooks/useUsuarioActual";
import { autenticarUsuario } from "../data/usuarios";
import { ROLES_PANEL } from "../constants/roles";
import { validarLogin } from "../utils/validaciones";

function InicioSesion() {
  const [datos, setDatos] = useState({ correo: "", contrasena: "" });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const { iniciarSesion } = useUsuarioActual();
  const navegar = useNavigate();

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos({ ...datos, [name]: value });
  }

  function enviar(evento) {
    evento.preventDefault();

    const nuevosErrores = validarLogin(datos);
    setErrores(nuevosErrores);
    setErrorGeneral("");

    if (Object.keys(nuevosErrores).length > 0) return;

    const usuario = autenticarUsuario(datos.correo, datos.contrasena);

    if (!usuario) {
      setErrorGeneral("Correo o contraseña incorrectos.");
      return;
    }

    iniciarSesion(usuario);
    navegar(ROLES_PANEL.includes(usuario.tipoUsuario) ? "/panel" : "/");
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
        <Button type="submit" className="w-100">Iniciar sesión</Button>
      </Form>

      <p className="mt-3">
        ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
      </p>
    </Container>
  );
}

export default InicioSesion;