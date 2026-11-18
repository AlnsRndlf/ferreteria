import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PanelLayout from "../../components/PanelLayout";
import CampoFormulario from "../../components/CampoFormulario";
import EstadoCarga from "../../components/EstadoCarga";
import { useApi } from "../../hooks/useApi";
import { listarCategorias } from "../../services/categoriaService";
import {
  actualizarProducto,
  crearProducto,
  obtenerProductoPorCodigo,
} from "../../services/productoService";
import { validarProducto } from "../../utils/validarProducto";

const inicial = {
  codigo: "",
  nombre: "",
  descripcion: "",
  precio: "",
  stock: "",
  stockMinimo: "",
  descuento: "",
  categoria: "",
  marca: "",
  unidad: "Unidad",
  imagen: "",
};

function datosIniciales(producto) {
  if (!producto) return inicial;
  return {
    ...inicial,
    ...producto,
    descripcion: producto.descripcion ?? "",
    marca: producto.marca ?? "",
    unidad: producto.unidad ?? "Unidad",
    imagen: producto.imagen ?? "",
  };
}

function FormularioProducto({ categorias, producto }) {
  const navegar = useNavigate();
  const esEdicion = Boolean(producto);

  const [datos, setDatos] = useState(datosIniciales(producto));
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [enviando, setEnviando] = useState(false);

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos({ ...datos, [name]: value });
  }

  function validar() {
    const nuevosErrores = validarProducto(datos);
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  async function enviar(evento) {
    evento.preventDefault();
    setErrorGeneral("");

    if (!validar()) return;

    const categoria = categorias.find((item) => item.nombre === datos.categoria);
    const solicitud = { ...datos, categoriaId: categoria?.id };

    setEnviando(true);
    try {
      if (esEdicion) {
        await actualizarProducto(producto.id, solicitud);
      } else {
        await crearProducto(solicitud);
      }
      navegar("/panel/productos");
    } catch (error) {
      if (error.status === 409) {
        setErrores({ codigo: error.message });
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
        nombre="codigo" etiqueta="Código" valor={datos.codigo}
        error={errores.codigo} onChange={cambiar} disabled={esEdicion}
      />
      <CampoFormulario
        nombre="nombre" etiqueta="Nombre" valor={datos.nombre}
        error={errores.nombre} onChange={cambiar} maxLength={100}
      />
      <CampoFormulario
        nombre="descripcion" etiqueta="Descripción (opcional)"
        valor={datos.descripcion} error={errores.descripcion}
        onChange={cambiar} as="textarea" rows={3} maxLength={500}
      />

      <Row>
        <Col xs={12} sm={6}>
          <CampoFormulario
            nombre="precio" etiqueta="Precio" type="number" min="0"
            valor={datos.precio} error={errores.precio} onChange={cambiar}
          />
        </Col>
        <Col xs={12} sm={6}>
          <CampoFormulario
            nombre="stock" etiqueta="Stock" type="number" min="0"
            valor={datos.stock} error={errores.stock} onChange={cambiar}
          />
        </Col>
      </Row>

      <CampoFormulario
        nombre="stockMinimo" etiqueta="Stock crítico (opcional)"
        type="number" min="0" valor={datos.stockMinimo}
        error={errores.stockMinimo} onChange={cambiar}
      />

      <CampoFormulario
        nombre="descuento" etiqueta="Descuento % (opcional, aparece en Ofertas)"
        type="number" min="0" max="90" valor={datos.descuento}
        error={errores.descuento} onChange={cambiar}
      />

      <CampoFormulario
        nombre="categoria" etiqueta="Categoría" seleccion
        valor={datos.categoria} error={errores.categoria} onChange={cambiar}
      >
        <option value="">Seleccione una categoría</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.nombre}>
            {categoria.nombre}
          </option>
        ))}
      </CampoFormulario>

      <CampoFormulario
        nombre="marca" etiqueta="Marca" valor={datos.marca}
        onChange={cambiar}
      />
      <CampoFormulario
        nombre="imagen" etiqueta="Ruta de la imagen (opcional)"
        valor={datos.imagen} onChange={cambiar}
        placeholder="/img/productos/nombre-archivo.png"
      />

      <Button type="submit" disabled={enviando}>
        {enviando ? "Guardando..." : esEdicion ? "Guardar cambios" : "Crear producto"}
      </Button>
    </Form>
  );
}

function ProductoForm() {
  const { codigo } = useParams();
  const esEdicion = Boolean(codigo);

  // Primero se cargan las categorías (y el producto, si se está editando)
  const { datos, cargando, error } = useApi(
    () =>
      Promise.all([
        listarCategorias(),
        esEdicion ? obtenerProductoPorCodigo(codigo) : Promise.resolve(null),
      ]),
    [codigo]
  );
  const [categorias, producto] = datos ?? [[], null];

  return (
    <PanelLayout titulo={esEdicion ? "Editar producto" : "Nuevo producto"}>
      <EstadoCarga cargando={cargando} error={error}>
        {esEdicion && !producto ? (
          <p className="text-danger fw-bold">El producto solicitado no existe.</p>
        ) : (
          <FormularioProducto categorias={categorias} producto={producto} />
        )}
      </EstadoCarga>
    </PanelLayout>
  );
}

export default ProductoForm;
