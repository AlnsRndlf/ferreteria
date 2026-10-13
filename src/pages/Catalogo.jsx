import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import GrillaProductos from "../components/GrillaProductos";
import { useCarrito } from "../context/CarritoContext";
import { obtenerProductos, obtenerCategorias } from "../data/productos";
import { filtrarProductos } from "../utils/filtrarProductos";

function Catalogo({ onAgregarCarrito }) {
  const [categoria, setCategoria] = useState("Todas");
  // El buscador de la barra superior envía /productos?q=texto
  const [parametros] = useSearchParams();
  const texto = parametros.get("q") || "";

  const { agregar } = useCarrito();

  const productos = obtenerProductos();
  const categorias = obtenerCategorias();
  const visibles = filtrarProductos(productos, { categoria, texto });

  // Si la página recibe onAgregarCarrito la usa; si no, usa el carrito
  // de CarritoContext.
  function agregarAlCarrito(producto) {
    if (onAgregarCarrito) {
      onAgregarCarrito(producto);
    } else {
      agregar(producto);
    }
  }

  return (
    <Container as="main" className="py-4">
      <h1 className="mb-1">Productos</h1>

      <p className="text-muted">
        Selección de {productos.length} productos de nuestro catálogo, que en
        tienda supera las 800 referencias.
      </p>

      {texto && (
        <p>
          Resultados para: <strong>{texto}</strong>
        </p>
      )}

      <Form.Group className="mb-3" controlId="filtroCategoria">
        <Form.Label>Filtrar por categoría</Form.Label>
        <Form.Select
          style={{ maxWidth: "20rem" }}
          value={categoria}
          onChange={(evento) => setCategoria(evento.target.value)}
        >
          <option>Todas</option>
          {categorias.map((nombreCategoria) => (
            <option key={nombreCategoria}>{nombreCategoria}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <p className="text-muted small">
        Mostrando {visibles.length} producto(s).
      </p>

      <GrillaProductos productos={visibles} onAgregarCarrito={agregarAlCarrito} />
    </Container>
  );
}

export default Catalogo;