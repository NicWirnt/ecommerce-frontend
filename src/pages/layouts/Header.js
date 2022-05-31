import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export const Header = () => {
  return (
    <div>
      <Navbar bg="secondary" expand="md">
        <Container>
          <Navbar.Brand href="#home">My Toys</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Register</Nav.Link>
              <Nav.Link href="#link">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
