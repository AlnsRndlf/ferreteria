import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CarritoProvider, useCarrito } from "./CarritoContext";

function TestComponent() {
  const { items, agregar, cambiarCantidad, quitar, vaciar, total } = useCarrito();
  return (
    <div>
      <span data-testid="total">{total}</span>
      <span data-testid="count">{items.length}</span>
      <button onClick={() => agregar({ codigo: "A1", nombre: "Prod", precio: 100, stock: 10 }, 2)}>Agregar</button>
      <button onClick={() => cambiarCantidad("A1", 5)}>Cambiar</button>
      <button onClick={() => quitar("A1")}>Quitar</button>
      <button onClick={() => vaciar()}>Vaciar</button>
    </div>
  );
}

describe("CarritoContext", () => {
  it("permite agregar, cambiar cantidad, quitar y vaciar el carrito", async () => {
    const user = userEvent.setup();
    render(<CarritoProvider><TestComponent /></CarritoProvider>);

    expect(screen.getByTestId("count").textContent).toBe("0");

    await user.click(screen.getByText("Agregar"));
    expect(screen.getByTestId("count").textContent).toBe("1");
    expect(screen.getByTestId("total").textContent).toBe("200");

    await user.click(screen.getByText("Cambiar"));
    expect(screen.getByTestId("total").textContent).toBe("500");

    await user.click(screen.getByText("Quitar"));
    expect(screen.getByTestId("count").textContent).toBe("0");

    await user.click(screen.getByText("Agregar"));
    await user.click(screen.getByText("Vaciar"));
    expect(screen.getByTestId("count").textContent).toBe("0");
  });
});