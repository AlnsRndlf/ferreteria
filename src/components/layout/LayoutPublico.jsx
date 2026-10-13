import { Outlet } from "react-router-dom";
import Navegacion from "./Navegacion";
import PiePagina from "./PiePagina";

function LayoutPublico() {
  return (
    <>
      <Navegacion />
      <Outlet />
      <PiePagina />
    </>
  );
}

export default LayoutPublico;