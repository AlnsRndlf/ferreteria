import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PanelLayout from "../../components/PanelLayout";
import CampoFormulario from "../../components/CampoFormulario";
import EstadoCarga from "../../components/EstadoCarga";
import { useApi } from "../../hooks/useApi";
import {
  actualizarCategoria,
  crearCategoria,
  obtenerCategoria,
} from "../../services/categoriaService";

function FormularioCategoria({ categoria }) {
  const navegar = useNavigate();
  const esEdicion = Boolean(categoria);

  const [nombre, setNombre] = useState(categoria ? categoria.nombre : "");
  const [error, setError] = useState("");
  const [errorGeneral, setErrorGeneral] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar(evento) {
    evento.preventDefault();
    setError("");
    setErrorGeneral("");

    if (!nombre.trim()) {
      setError("El nombre de la categoría es obligatorio.");
      return;
    }

    setEnviando(true);
    try {
      if (esEdicion) {
        await actualizarCategoria(categoria.id, nombre.trim());
      } else {
        await crearCategoria(nombre.trim());
      }
      navegar("/panel/categorias");
    } catch (e) {
      if (e.status === 409) {
        setError(e.message);
      } else {
        setErrorGeneral(e.message);
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Form onSubmit={enviar} noValidate className="panel-formulario">
      {errorGeneral && <Alert variant="danger">{errorGeneral}</Alert>}

      <CampoFormulario
        nombre="nombre"
        etiqueta="Nombre de la categoría"
        valor={nombre}
        error={error}
        onChange={(evento) => setNombre(evento.target.value)}
      />

      <Button type="submit" disabled={enviando}>
        {enviando ? "Guardando..." : esEdicion ? "Guardar cambios" : "Crear categoría"}
      </Button>
    </Form>
  );
}

function CategoriaForm() {
  const { id } = useParams();
  const esEdicion = Boolean(id);

  const { datos: categoria, cargando, error } = useApi(
    () => (esEdicion ? obtenerCategoria(id) : Promise.resolve(null)),
    [id]
  );

  return (
    <PanelLayout titulo={esEdicion ? "Editar categoría" : "Nueva categoría"}>
      <EstadoCarga cargando={cargando} error={error}>
        <FormularioCategoria categoria={categoria} />
      </EstadoCarga>
    </PanelLayout>
  );
}

export default CategoriaForm;
