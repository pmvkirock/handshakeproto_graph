import React from 'react';
import { Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, Link } from 'react-router-dom';

class Topnav extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    localStorage.removeItem('LogFlag');
    localStorage.removeItem('_id');
    localStorage.removeItem('type');
  };

  render() {
    var xnav;
    let redirectVar = null;
    if (localStorage.getItem('LogFlag')) redirectVar = <Redirect to="/home" />;
    else redirectVar = <Redirect to="/login" />;
    if (localStorage.getItem('LogFlag')) {
      var prof_pic = '/profile.png';
      xnav = (
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline className="mr-auto">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-3"
              style={{ display: 'none' }}
            />
          </Form>
          <Nav>
            <Nav.Link className="custom-nav">
              <Link to="/home">Jobs</Link>
            </Nav.Link>
            <Nav.Link className="custom-nav">
              <Link to="/all_students">Students</Link>
            </Nav.Link>
            <NavDropdown
              title={
                <img
                  src={prof_pic}
                  alt="user pic"
                  style={{ width: 40 + 'px', borderRadius: 50 + '%' }}
                />
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item>
                <Link to="/stud_prof">Profile</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/myapp">My Applications</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="/" onClick={this.handleLogout}>
                  Logout
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      );
    } else {
      xnav = (
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline className="mr-auto">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-3"
              style={{ display: 'none' }}
            />
          </Form>
          <Nav activeKey="/login">
            <Nav.Link className="custom-nav">
              <Link to="/login">Login</Link>
            </Nav.Link>
            <Nav.Link className="custom-nav">
              <Link to="/signup">Create Account</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      );
    }
    return (
      <div className="container">
        {redirectVar}
        <Navbar expand="lg" style={{ backgroundColor: '#FFF' }}>
          <Navbar.Brand style={{ marginRight: 30 + 'px' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="logo-icon"
              viewBox="0 0 80.1 96.1"
              className="style__logo-icon___1eROG"
              width="40"
              height="40"
            >
              <title>Handshake</title>
              <path
                className="style__logo-icon-content___1-wtb"
                d="
                                M76.6 42.9c-1.6-.6-9.2-2.4-19
                                .1-24.6 6.3-29.1-6.6-39.5-9.6-2.4-.7-12.2-1.5-15.9.4-1.3.7-2.2
                                2.3-2.2 3.8 0 6.7-.1 36.8-.1 51 0 4.1 3.3 7.4 7.4
                                7.4h15.4c4 0 7.3-3.3 7.4-7.3.1-12.4.3-33.7.3-36.1
                                0-.9.5-1.1 1.6-1.4 9.8-2.5 17.4 3 17.6 10.7.2 8.5.4
                                18.3.4 26.8 0 4 3.3 7.3 7.3 7.3 4.6 0 10.4.1 15.3.1
                                4 0 7.3-3.3 7.3-7.3 0-13.7.1-33.3.1-41.4 0-2.4-1.4-3.7-3.4-4.5zM66.5
                                36.8c7.5 0 13.6-6.1 13.6-13.6S74 9.6 66.5 9.6s-13.6 6.1-13.6
                                13.6c0 7.6 6.1 13.6 13.6 13.6zM14.3 28.6c7.9 0 14.3-6.4 14.3-14.3S22.2
                                0 14.3 0 0 6.4 0 14.3s6.4 14.3 14.3 14.3z
                                "
              ></path>
            </svg>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {xnav}
        </Navbar>
      </div>
    );
  }
}

export default Topnav;
