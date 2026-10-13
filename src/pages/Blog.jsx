import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import CampoFormulario from "../components/CampoFormulario";
import { guardarDatos, leerDatos } from "../utils/persistencia";
import { validarContacto } from "../utils/validaciones";

const inicial = { nombre: "", correo: "", comentario: "" };

function Blog() {
  const [datos, setDatos] = useState(inicial);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos({ ...datos, [name]: value });
    setEnviado(false);
  }

  function enviar(evento) {
    evento.preventDefault();

    const nuevosErrores = validarContacto(datos);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return;

    // Mensajes internos: se guardan para que el negocio los pueda leer.
    const mensajes = leerDatos("mensajesContacto", []);
    mensajes.push({ ...datos, fecha: new Date().toISOString() });
    guardarDatos("mensajesContacto", mensajes);

    setDatos(inicial);
    setEnviado(true);
  }

  return (
    <Container as="main" className="py-4">
      <header className="text-center mb-4">
        <h1>Nuestra Historia</h1>
        <p className="text-muted">
          Más de 22 años apoyando la construcción en La Serena y la Región de Coquimbo.
        </p>
      </header>

      <Row className="g-4 mb-5">
        <Col xs={12} lg={7}>
          <article>
            <h2 className="h4">¿Quiénes Somos?</h2>
            <p>
              <strong>Ferretería Los Maestros</strong> es un negocio familiar
              atendido por sus propios dueños. Durante más de dos décadas, nos
              hemos dedicado a proveer los mejores materiales de construcción,
              herramientas y artículos de gasfitería a particulares y
              contratistas.
            </p>
            <p>
              Nuestra misión es que nunca te falte una herramienta en tu obra.
            </p>
            <figure>
              <img
                src="/img/hermanos.png"
                alt="Fachada e interior de la Ferretería Los Maestros"
                className="img-fluid rounded"
              />
              <figcaption className="text-muted small">
                Nuestro equipo trabajando día a día en La Serena.
              </figcaption>
            </figure>
          </article>
        </Col>

        <Col xs={12} lg={5}>
          <aside>
            <h2 className="h4">Conoce nuestras herramientas</h2>
            <p>
              Te mostramos un breve recorrido por el tipo de herramientas
              profesionales que encontrarás en nuestro catálogo.
            </p>
            <div className="ratio ratio-16x9">
              <iframe
                src="https://www.youtube.com/embed/aPJQdndAil8"
                title="Video demostrativo de herramientas de ferretería"
                loading="lazy"
                allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </aside>
        </Col>
      </Row>

      <section aria-labelledby="titulo-contacto">
        <h2 id="titulo-contacto" className="text-center h4 mb-3">Contáctanos</h2>

        <Form onSubmit={enviar} noValidate className="mx-auto" style={{ maxWidth: "36rem" }}>
          <p className="text-muted">Envíanos tus dudas o cotizaciones.</p>

          {enviado && (
            <Alert variant="success">Mensaje enviado. ¡Gracias por escribirnos!</Alert>
          )}

          <CampoFormulario
            nombre="nombre" etiqueta="Nombre completo" valor={datos.nombre}
            error={errores.nombre} onChange={cambiar} placeholder="Ej. Juan Pérez"
          />
          <CampoFormulario
            nombre="correo" etiqueta="Correo electrónico (opcional)" type="email"
            valor={datos.correo} error={errores.correo} onChange={cambiar}
            placeholder="ejemplo@gmail.com"
          />
          <CampoFormulario
            nombre="comentario" etiqueta="Mensaje o consulta" as="textarea" rows={5}
            valor={datos.comentario} error={errores.comentario} onChange={cambiar}
            placeholder="Escribe aquí tu consulta de stock..."
          />

          <Button type="submit">Enviar mensaje</Button>
        </Form>
      </section>
    </Container>
  );
}

export default Blog;