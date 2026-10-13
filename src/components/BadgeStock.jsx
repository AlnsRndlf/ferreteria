import { estadoStock } from "../utils/stock";

function BadgeStock({ producto }) {
  const estado = estadoStock(producto);

  return (
    <span className={`panel-badge ${estado === "OK" ? "ok" : "critico"}`}>
      {estado}
    </span>
  );
}

export default BadgeStock;