import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CampoFormulario from "../components/CampoFormulario";
import { crearUsuario, existeCorreo, obtenerUsuarioPorRun } from "../data/usuarios";
import { regionesComunas } from "../data/regionesComunas";
import { ROLES } from "../constants/roles";
import { validarRegistro } from "../utils/validaciones";

const inicial = {
  run: "", nombre: "", apellidos: "", correo: "", contrasena: "",
  region: "", comuna: "", direccion: "",
};

function Registro() {
  const [datos, setDatos] = useState(inicial);
  const [errores, setErrores] = useState({});
  const [registrado, setRegistrado] = useState(false);

  const regionElegida = regionesComunas.find((item) => item.region === datos.region);
  const comunasDisponibles = regionElegida ? regionElegida.comunas : [];

  function cambiar(evento) {
    const { name, value } = evento.target;

    if (name === "region") {
      setDatos({ ...datos, region: value, comuna: "" });
    } else {
      setDatos({ ...datos, [name]: value });
    }
  }

  function enviar(evento) {
    evento.preventDefault();

    const nuevosErrores = validarRegistro(datos);

    if (!nuevosErrores.run && obtenerUsuarioPorRun(datos.run.trim().toUpperCase())) {
      nuevosErrores.run = "Ya existe un usuario con ese RUN.";
    }
    if (!nuevosErrores.correo && existeCorreo(datos.correo)) {
      nuevosErrores.correo = "Ya existe un usuario con ese correo.";
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return;

    crearUsuario({
      ...datos,
      run: datos.run.trim().toUpperCase(),
      nombre: datos.nombre.trim(),
      apellidos: datos.apellidos.trim(),
      correo: datos.correo.trim(),
      direccion: datos.direccion.trim(),
      tipoUsuario: ROLES.CLIENTE,
    });

    setDatos(inicial);
    setRegistrado(true);
  }

  return (
    <Container as="main" className="py-4" style={{ maxWidth: "40rem" }}>
      <h1 className="h3">Registro de usuario</h1>
      <p className="text-muted">Completa tus datos para crear una cuenta.</p>

      {registrado && (
        <Alert variant="success">
          Usuario registrado correctamente. <Link to="/inicio-sesion">Inicia sesión aquí</Link>.
        </Alert>
      )}

      <Form onSubmit={enviar} noValidate>
        <CampoFormulario
          nombre="run" etiqueta="RUN (sin puntos ni guion)" valor={datos.run}
          error={errores.run} onChange={cambiar} maxLength={9}
        />

        <Row>
          <Col xs={12} sm={6}>
            <CampoFormulario nombre="nombre" etiqueta="Nombre" valor={datos.nombre}
              error={errores.nombre} onChange={cambiar} maxLength={50} />
          </Col>
          <Col xs={12} sm={6}>
            <CampoFormulario nombre="apellidos" etiqueta="Apellidos" valor={datos.apellidos}
              error={errores.apellidos} onChange={cambiar} maxLength={100} />
          </Col>
        </Row>

        <CampoFormulario nombre="correo" etiqueta="Correo electrónico" type="email"
          valor={datos.correo} error={errores.correo} onChange={cambiar} />
        <CampoFormulario nombre="contrasena" etiqueta="Contraseña (4 a 10 caracteres)"
          type="password" valor={datos.contrasena} error={errores.contrasena}
          onChange={cambiar} />

        <Row>
          <Col xs={12} sm={6}>
            <CampoFormulario nombre="region" etiqueta="Región" seleccion valor={datos.region}
              error={errores.region} onChange={cambiar}>
              <option value="">Seleccione una región</option>
              {regionesComunas.map((item) => (
                <option key={item.region}>{item.region}</option>
              ))}
            </CampoFormulario>
          </Col>
          <Col xs={12} sm={6}>
            <CampoFormulario nombre="comuna" etiqueta="Comuna" seleccion valor={datos.comuna}
              error={errores.comuna} onChange={cambiar} disabled={!datos.region}>
              <option value="">Seleccione una comuna</option>
              {comunasDisponibles.map((nombreComuna) => (
                <option key={nombreComuna}>{nombreComuna}</option>
              ))}
            </CampoFormulario>
          </Col>
        </Row>

        <CampoFormulario nombre="direccion" etiqueta="Dirección" valor={datos.direccion}
          error={errores.direccion} onChange={cambiar} maxLength={300} />

        <Button type="submit" className="w-100">Registrarse</Button>
      </Form>

      <p className="mt-3">
        ¿Ya tienes una cuenta? <Link to="/inicio-sesion">Inicia sesión aquí</Link>
      </p>
    </Container>
  );
}

export default Registro;