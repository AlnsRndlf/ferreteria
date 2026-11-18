import { Container } from "react-bootstrap";
import GrillaProductos from "../components/GrillaProductos";
import { useCarrito } from "../context/CarritoContext";
import EstadoCarga from "../components/EstadoCarga";
import { useApi } from "../hooks/useApi";
import { listarProductos } from "../services/productoService";
import { tieneOferta } from "../utils/precio";

function Ofertas({ onAgregarCarrito }) {
  const { agregar } = useCarrito();
  const { datos, cargando, error } = useApi(listarProductos, []);
  const ofertas = (datos ?? []).filter(tieneOferta);

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

      <EstadoCarga cargando={cargando} error={error}>
      {ofertas.length === 0 ? (
        <p className="text-muted">
          Por ahora no hay productos en oferta. Vuelve pronto.
        </p>
      ) : (
        <GrillaProductos productos={ofertas} onAgregarCarrito={agregarAlCarrito} />
      )}
      </EstadoCarga>
    </Container>
  );
}

export default Ofertas;