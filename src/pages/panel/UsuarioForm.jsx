import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PanelLayout from "../../components/PanelLayout";
import CampoFormulario from "../../components/CampoFormulario";
import {
  obtenerUsuarioPorRun,
  crearUsuario,
  actualizarUsuario,
} from "../../data/usuarios";
import { regionesComunas } from "../../data/regionesComunas";
import { validarRun, validarCorreoPermitido } from "../../utils/validarRun";
import { TIPOS_USUARIO } from "../../constants/roles";

const inicial = {
  run: "",
  nombre: "",
  apellidos: "",
  correo: "",
  fechaNacimiento: "",
  tipoUsuario: "Cliente",
  region: "",
  comuna: "",
  direccion: "",
};

function UsuarioForm() {
  const { run } = useParams();
  const navegar = useNavigate();
  const esEdicion = Boolean(run);

  const usuarioExistente = esEdicion ? obtenerUsuarioPorRun(run) : null;

  const [datos, setDatos] = useState(
    usuarioExistente ? { ...inicial, ...usuarioExistente } : inicial
  );
  const [errores, setErrores] = useState({});

  const regionElegida = regionesComunas.find(
    (item) => item.region === datos.region
  );
  const comunasDisponibles = regionElegida ? regionElegida.comunas : [];

  function cambiar(evento) {
    const { name, value } = evento.target;

    // Al cambiar de región se reinicia la comuna (PDF Evaluación 1).
    if (name === "region") {
      setDatos({ ...datos, region: value, comuna: "" });
    } else {
      setDatos({ ...datos, [name]: value });
    }
  }

  function validar() {
    const nuevosErrores = {};

    if (!validarRun(datos.run)) {
      nuevosErrores.run = "RUN inválido (sin puntos ni guion, ej: 19011022K).";
    }
    if (!datos.nombre.trim() || datos.nombre.length > 50) {
      nuevosErrores.nombre = "Obligatorio (máximo 50 caracteres).";
    }
    if (!datos.apellidos.trim() || datos.apellidos.length > 100) {
      nuevosErrores.apellidos = "Obligatorio (máximo 100 caracteres).";
    }
    if (!validarCorreoPermitido(datos.correo) || datos.correo.length > 100) {
      nuevosErrores.correo = "Solo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    }
    if (!datos.region) nuevosErrores.region = "Selecciona una región.";
    if (!datos.comuna) nuevosErrores.comuna = "Selecciona una comuna.";
    if (!datos.direccion.trim() || datos.direccion.length > 300) {
      nuevosErrores.direccion = "Obligatoria (máximo 300 caracteres).";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  function enviar(evento) {
    evento.preventDefault();

    if (!validar()) return;

    if (esEdicion) {
      actualizarUsuario(run, datos);
    } else {
      crearUsuario(datos);
    }

    navegar("/panel/usuarios");
  }

  return (
    <PanelLayout titulo={esEdicion ? "Editar usuario" : "Nuevo usuario"}>
      <Form onSubmit={enviar} noValidate className="panel-formulario">
        <CampoFormulario
          nombre="run" etiqueta="RUN (sin puntos ni guion)" valor={datos.run}
          error={errores.run} onChange={cambiar} disabled={esEdicion}
        />

        <Row>
          <Col xs={12} sm={6}>
            <CampoFormulario
              nombre="nombre" etiqueta="Nombre" valor={datos.nombre}
              error={errores.nombre} onChange={cambiar}
            />
          </Col>
          <Col xs={12} sm={6}>
            <CampoFormulario
              nombre="apellidos" etiqueta="Apellidos" valor={datos.apellidos}
              error={errores.apellidos} onChange={cambiar}
            />
          </Col>
        </Row>

        <CampoFormulario
          nombre="correo" etiqueta="Correo electrónico" type="email"
          valor={datos.correo} error={errores.correo} onChange={cambiar}
        />
        <CampoFormulario
          nombre="fechaNacimiento" etiqueta="Fecha de nacimiento (opcional)"
          type="date" valor={datos.fechaNacimiento} onChange={cambiar}
        />

        <CampoFormulario
          nombre="tipoUsuario" etiqueta="Tipo de usuario" seleccion
          valor={datos.tipoUsuario} onChange={cambiar}
        >
          {TIPOS_USUARIO.map((tipo) => (
            <option key={tipo}>{tipo}</option>
          ))}
        </CampoFormulario>

        <Row>
          <Col xs={12} sm={6}>
            <CampoFormulario
              nombre="region" etiqueta="Región" seleccion valor={datos.region}
              error={errores.region} onChange={cambiar}
            >
              <option value="">Seleccione una región</option>
              {regionesComunas.map((item) => (
                <option key={item.region}>{item.region}</option>
              ))}
            </CampoFormulario>
          </Col>
          <Col xs={12} sm={6}>
            <CampoFormulario
              nombre="comuna" etiqueta="Comuna" seleccion valor={datos.comuna}
              error={errores.comuna} onChange={cambiar} disabled={!datos.region}
            >
              <option value="">Seleccione una comuna</option>
              {comunasDisponibles.map((nombreComuna) => (
                <option key={nombreComuna}>{nombreComuna}</option>
              ))}
            </CampoFormulario>
          </Col>
        </Row>

        <CampoFormulario
          nombre="direccion" etiqueta="Dirección" valor={datos.direccion}
          error={errores.direccion} onChange={cambiar} maxLength={300}
        />

        <Button type="submit">
          {esEdicion ? "Guardar cambios" : "Crear usuario"}
        </Button>
      </Form>
    </PanelLayout>
  );
}

export default UsuarioForm;
