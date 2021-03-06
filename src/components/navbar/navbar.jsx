import { Navbar, Container } from "react-bootstrap";

const navbar = () => {

  return <Navbar bg="white" variant="dark">
  <Container>
    <Navbar.Brand color="text-dark" href="#home">Navbar with text</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        Signed in as: <a href="#login">Mark Otto</a>
      </Navbar.Text>
    </Navbar.Collapse>
  </Container>
</Navbar>
}

export default navbar;