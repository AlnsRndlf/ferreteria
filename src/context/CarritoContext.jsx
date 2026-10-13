import { createContext, useContext, useEffect, useState } from "react";
import { guardarDatos, leerDatos } from "../utils/persistencia";
import { precioFinal } from "../utils/precio";

const CLAVE_CARRITO = "carrito";

// Valor por defecto: sin Provider (por ejemplo en pruebas) el carrito
// existe pero no hace nada.
const CarritoContext = createContext({
  items: [],
  cantidadTotal: 0,
  total: 0,
  agregar() {},
  cambiarCantidad() {},
  quitar() {},
  vaciar() {},
});

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(() => leerDatos(CLAVE_CARRITO, []));

  useEffect(() => {
    guardarDatos(CLAVE_CARRITO, items);
  }, [items]);

  function agregar(producto, cantidad = 1) {
    setItems((actuales) => {
      const existente = actuales.find((item) => item.codigo === producto.codigo);
      const nuevaCantidad = Math.min((existente ? existente.cantidad : 0) + cantidad, producto.stock);

      if (nuevaCantidad < 1) return actuales;

      if (existente) {
        return actuales.map((item) =>
          item.codigo === producto.codigo ? { ...item, cantidad: nuevaCantidad } : item
        );
      }

      return [
        ...actuales,
        {
          codigo: producto.codigo,
          nombre: producto.nombre,
          precio: precioFinal(producto),
          cantidad: nuevaCantidad,
          stock: producto.stock,
          imagen: producto.imagen || null,
        },
      ];
    });
  }

  function cambiarCantidad(codigo, cantidad) {
    setItems((actuales) =>
      actuales.map((item) =>
        item.codigo === codigo
          ? { ...item, cantidad: Math.max(1, Math.min(cantidad, item.stock)) }
          : item
      )
    );
  }

  function quitar(codigo) {
    setItems((actuales) => actuales.filter((item) => item.codigo !== codigo));
  }

  function vaciar() {
    setItems([]);
  }

  const cantidadTotal = items.reduce((suma, item) => suma + item.cantidad, 0);
  const total = items.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

  return (
    <CarritoContext.Provider
      value={{ items, cantidadTotal, total, agregar, cambiarCantidad, quitar, vaciar }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}
