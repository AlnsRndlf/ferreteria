import { Container } from "react-bootstrap";
import GrillaProductos from "../components/GrillaProductos";
import { useCarrito } from "../context/CarritoContext";
import { obtenerProductosEnOferta } from "../data/productos";

function Ofertas({ onAgregarCarrito }) {
  const { agregar } = useCarrito();
  const ofertas = obtenerProductosEnOferta();

  function agregarAlCarrito(producto) {
    if (onAgregarCarrito) {
      onAgregarCarrito(producto);
    } else {
      agregar(producto);
    }
  }

  return (
    <Container as="main" className="py-4">
      <h1 className="mb-3">Ofertas</h1>

      {ofertas.length === 0 ? (
        <p className="text-muted">
          Por ahora no hay productos en oferta. Vuelve pronto.
        </p>
      ) : (
        <GrillaProductos productos={ofertas} onAgregarCarrito={agregarAlCarrito} />
      )}
    </Container>
  );
}

export default Ofertas;