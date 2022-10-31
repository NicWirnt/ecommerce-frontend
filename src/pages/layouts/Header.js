import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../system-state/systemSlice.js";
export const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.admin);

  return (
    <div>
      <Navbar bg="secondary" expand="md">
        <Container>
          {user._id && (
            <Button variant="primary" onClick={() => dispatch(toggleSidebar())}>
              <i className="fa-solid fa-bars"></i>
            </Button>
          )}
          <LinkContainer to="/">
            <Navbar.Brand href="#home">My Toys</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!user._id ? (
                <>
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                  <Link to="/" className="nav-link">
                    Login
                  </Link>
                </>
              ) : (
                <i class="fa-solid fa-envelope"></i>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
