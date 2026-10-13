function TarjetaResumen({ valor, etiqueta, alerta }) {
  return (
    <div className={`panel-tarjeta-resumen ${alerta ? "alerta" : ""}`}>
      <strong>{valor}</strong>
      <span>{etiqueta}</span>
    </div>
  );
}

export default TarjetaResumen;