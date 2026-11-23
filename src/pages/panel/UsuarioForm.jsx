import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PanelLayout from "../../components/PanelLayout";
import CampoFormulario from "../../components/CampoFormulario";
import EstadoCarga from "../../components/EstadoCarga";
import { TIPOS_USUARIO } from "../../constants/roles";
import { regionesComunas } from "../../data/regionesComunas";
import { useApi } from "../../hooks/useApi";
import {
  actualizarUsuario,
  crearUsuario,
  obtenerUsuario,
} from "../../services/usuarioService";
import { validarCorreoPermitido, validarRun } from "../../utils/validarRun";

const inicial = {
  run: "",
  nombre: "",
  apellidos: "",
  correo: "",
  password: "",
  tipoUsuario: "Cliente",
  region: "",
  comuna: "",
  direccion: "",
};

function FormularioUsuario({ usuario }) {
  const navegar = useNavigate();
  const esEdicion = Boolean(usuario);

  const [datos, setDatos] = useState(usuario ? { ...inicial, ...usuario } : inicial);
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [enviando, setEnviando] = useState(false);

  const regionElegida = regionesComunas.find((item) => item.region === datos.region);
  const comunasDisponibles = regionElegida ? regionElegida.comunas : [];

  function cambiar(evento) {
    const { name, value } = evento.target;

    // Al cambiar de región se reinicia la comuna
    if (name === "region") {
      setDatos({ ...datos, region: value, comuna: "" });
    } else {
      setDatos({ ...datos, [name]: value });
    }
  }

  function validar() {
    const nuevosErrores = {};

    if (!validarRun(datos.run)) {
      nuevosErrores.run = "RUN inválido (sin puntos ni guion, ej: 123456785).";
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

    // Al crear la contraseña es obligatoria; al editar solo se valida si se escribe una nueva
    const hayPassword = datos.password.length > 0;
    if ((!esEdicion || hayPassword) && (datos.password.length < 4 || datos.password.length > 10)) {
      nuevosErrores.password = "La contraseña debe tener entre 4 y 10 caracteres.";
    }

    if (!datos.region) nuevosErrores.region = "Selecciona una región.";
    if (!datos.comuna) nuevosErrores.comuna = "Selecciona una comuna.";
    if (!datos.direccion.trim() || datos.direccion.length > 300) {
      nuevosErrores.direccion = "Obligatoria (máximo 300 caracteres).";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  async function enviar(evento) {
    evento.preventDefault();
    setErrorGeneral("");

    if (!validar()) return;

    setEnviando(true);
    try {
      if (esEdicion) {
        await actualizarUsuario(usuario.id, datos);
      } else {
        await crearUsuario(datos);
      }
      navegar("/panel/usuarios");
    } catch (error) {
      if (error.status === 409) {
        // El backend avisa si lo repetido es el RUN o el correo
        setErrores(error.message.includes("RUN") ? { run: error.message } : { correo: error.message });
      } else {
        setErrorGeneral(error.message);
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Form onSubmit={enviar} noValidate className="panel-formulario">
      {errorGeneral && <Alert variant="danger">{errorGeneral}</Alert>}

      <CampoFormulario
        nombre="run" etiqueta="RUN (sin puntos ni guion)" valor={datos.run}
        error={errores.run} onChange={cambiar} disabled={esEdicion && Boolean(usuario.run)}
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
        nombre="password"
        etiqueta={esEdicion ? "Contraseña nueva (déjala vacía para no cambiarla)" : "Contraseña (4 a 10 caracteres)"}
        type="password" valor={datos.password} error={errores.password}
        onChange={cambiar} autoComplete="new-password"
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

      <Button type="submit" disabled={enviando}>
        {enviando ? "Guardando..." : esEdicion ? "Guardar cambios" : "Crear usuario"}
      </Button>
    </Form>
  );
}

function UsuarioForm() {
  const { id } = useParams();
  const esEdicion = Boolean(id);

  const { datos: usuario, cargando, error } = useApi(
    () => (esEdicion ? obtenerUsuario(id) : Promise.resolve(null)),
    [id]
  );

  return (
    <PanelLayout titulo={esEdicion ? "Editar usuario" : "Nuevo usuario"}>
      <EstadoCarga cargando={cargando} error={error}>
        <FormularioUsuario usuario={usuario} />
      </EstadoCarga>
    </PanelLayout>
  );
}

export default UsuarioForm;
