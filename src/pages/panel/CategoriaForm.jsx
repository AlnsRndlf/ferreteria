import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PanelLayout from "../../components/PanelLayout";
import CampoFormulario from "../../components/CampoFormulario";
import {
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
} from "../../data/categorias";

function CategoriaForm() {
  const { id } = useParams();
  const navegar = useNavigate();
  const esEdicion = Boolean(id);

  const categoriaExistente = esEdicion ? obtenerCategoriaPorId(Number(id)) : null;

  const [nombre, setNombre] = useState(
    categoriaExistente ? categoriaExistente.nombre : ""
  );
  const [error, setError] = useState("");

  function enviar(evento) {
    evento.preventDefault();

    if (!nombre.trim()) {
      setError("El nombre de la categoría es obligatorio.");
      return;
    }

    if (esEdicion) {
      actualizarCategoria(Number(id), nombre.trim());
    } else {
      crearCategoria(nombre.trim());
    }

    navegar("/panel/categorias");
  }

  return (
    <PanelLayout titulo={esEdicion ? "Editar categoría" : "Nueva categoría"}>
      <Form onSubmit={enviar} noValidate className="panel-formulario">
        <CampoFormulario
          nombre="nombre"
          etiqueta="Nombre de la categoría"
          valor={nombre}
          error={error}
          onChange={(evento) => setNombre(evento.target.value)}
        />

        <Button type="submit">
          {esEdicion ? "Guardar cambios" : "Crear categoría"}
        </Button>
      </Form>
    </PanelLayout>
  );
}

export default CategoriaForm;
