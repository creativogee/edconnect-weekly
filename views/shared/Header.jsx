import React from 'react';
import { Form, Button, Nav, Navbar, Image } from 'react-bootstrap';

const Header = ({ user }) => {
  return (
    <Navbar bg="primary" variant="dark" className="justify-content-between">
      <Nav>
        <Navbar.Brand href="/">Project Explorer</Navbar.Brand>
        <Form inline>
          <Form.Control type="text" placeholder="Search Projects" />
          <Button variant="outline-light" type="submit" className="ml-3 mr-2">
            Search
          </Button>
        </Form>
        <Nav>
          <Nav.Link href="/projects/submit">Projects</Nav.Link>
        </Nav>
      </Nav>

      {user ? (
        <Nav className="justify-content-end">
          <Nav.Link href="/logout">Logout</Nav.Link>
          <Nav.Link
            id="username"
            data-testid="username" //added this attribute for element selection in test
            href="/profile"
          >{`Hi ${user.firstname}`}</Nav.Link>
          <Image
            src={`${user.profileImage}`}
            roundedCircle
            style={{ height: 3 + 'rem', width: 3 + 'rem' }}
          ></Image>
        </Nav>
      ) : (
        <Nav className="justify-content-end">
          <Nav.Link href="/signup">Sign up</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      )}
    </Navbar>
  );
};

export default Header;
