import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SesionProvider } from "./SesionContext";
import { useUsuarioActual } from "../hooks/useUsuarioActual";

function TestComponent() {
  const { usuario, iniciarSesion, cerrarSesion } = useUsuarioActual();
  return (
    <div>
      <span data-testid="user">{usuario ? usuario.correo : "nadie"}</span>
      <button onClick={() => iniciarSesion({ correo: "admin@duoc.cl", tipoUsuario: "Admin" })}>Login</button>
      <button onClick={() => cerrarSesion()}>Logout</button>
    </div>
  );
}

describe("SesionContext y useUsuarioActual", () => {
  it("permite iniciar y cerrar sesión localmente", async () => {
    const user = userEvent.setup();
    render(<SesionProvider><TestComponent /></SesionProvider>);

    expect(screen.getByTestId("user").textContent).toBe("nadie");

    await user.click(screen.getByText("Login"));
    expect(screen.getByTestId("user").textContent).toBe("admin@duoc.cl");

    await user.click(screen.getByText("Logout"));
    expect(screen.getByTestId("user").textContent).toBe("nadie");
  });
});