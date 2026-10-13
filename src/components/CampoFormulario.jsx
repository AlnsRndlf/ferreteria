import { Form } from "react-bootstrap";

function CampoFormulario({
  nombre,
  etiqueta,
  valor,
  error,
  onChange,
  seleccion = false,
  children,
  ...resto
}) {
  const Control = seleccion ? Form.Select : Form.Control;

  return (
    <Form.Group className="mb-3" controlId={nombre}>
      <Form.Label>{etiqueta}</Form.Label>
      <Control
        name={nombre}
        value={valor}
        onChange={onChange}
        isInvalid={Boolean(error)}
        {...resto}
      >
        {children}
      </Control>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
}

export default CampoFormulario;