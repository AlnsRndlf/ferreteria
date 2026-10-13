import { Container } from "react-bootstrap";

function PiePagina() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container className="d-flex flex-column flex-md-row justify-content-between gap-2">
        <p className="mb-0">Ferretería Los Maestros · La Serena, Región de Coquimbo</p>
        <p className="mb-0 small text-secondary">
          Proyecto académico DSY1104 — Desarrollo Fullstack II
        </p>
      </Container>
    </footer>
  );
}

export default PiePagina;