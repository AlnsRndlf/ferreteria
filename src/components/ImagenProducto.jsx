import { useState } from "react";

function ImagenProducto({ producto, className = "", grande = false }) {
  const [fallo, setFallo] = useState(false);

  if (!producto.imagen || fallo) {
    return (
      <div
        className={`marcador-imagen-producto ${grande ? "marcador-imagen-producto-grande" : ""}`}
      />
    );
  }

  return (
    <img
      src={producto.imagen}
      alt={producto.nombre}
      className={`img-fluid ${className}`}
      onError={() => setFallo(true)}
    />
  );
}

export default ImagenProducto;