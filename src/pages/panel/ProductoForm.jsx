import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PanelLayout from "../../components/PanelLayout";
import CampoFormulario from "../../components/CampoFormulario";
import { validarProducto } from "../../utils/validarProducto";
import { obtenerProductoPorCodigo, obtenerCategorias, crearProducto, actualizarProducto,} from "../../data/productos";

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

function ProductoForm() {
  const { codigo } = useParams();
  const navegar = useNavigate();
  const esEdicion = Boolean(codigo);

  const productoExistente = esEdicion ? obtenerProductoPorCodigo(codigo) : null;
  const categorias = obtenerCategorias();

  const [datos, setDatos] = useState(
    productoExistente ? { ...inicial, ...productoExistente, imagen: productoExistente.imagen || "" } : inicial
  );
  const [errores, setErrores] = useState({});

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos({ ...datos, [name]: value });
  }

  function validar() {
    const nuevosErrores = validarProducto(datos);
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  function enviar(evento) {
    evento.preventDefault();

    if (!validar()) return;

    const productoFinal = {
      ...datos,
      precio: Number(datos.precio),
      stock: Number(datos.stock),
      stockMinimo: datos.stockMinimo === "" ? 0 : Number(datos.stockMinimo),
      descuento: datos.descuento === "" ? 0 : Number(datos.descuento),
      imagen: datos.imagen || null,
    };

    if (esEdicion) {
      actualizarProducto(codigo, productoFinal);
    } else {
      crearProducto(productoFinal);
    }

    navegar("/panel/productos");
  }

  return (
    <PanelLayout titulo={esEdicion ? "Editar producto" : "Nuevo producto"}>
      <Form onSubmit={enviar} noValidate className="panel-formulario">
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
          {categorias.map((nombreCategoria) => (
            <option key={nombreCategoria}>{nombreCategoria}</option>
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

        <Button type="submit">
          {esEdicion ? "Guardar cambios" : "Crear producto"}
        </Button>
      </Form>
    </PanelLayout>
  );
}

export default ProductoForm;
