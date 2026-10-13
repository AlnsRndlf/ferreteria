import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Pedidos from "./Pedidos";

describe("Pedidos (panel)", () => {
  it("muestra el mensaje de estado vacío cuando todavía no hay pedidos", () => {
    render(
      <MemoryRouter>
        <Pedidos />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Aún no hay pedidos registrados.")
    ).toBeInTheDocument();
  });
});
