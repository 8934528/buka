import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { FaMagic, FaHistory, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { authService } from '../services/authService';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/zodiac', label: 'Zodiac', icon: <FaMagic /> },
    { path: '/history', label: 'History', icon: <FaHistory /> },
    { path: '/profile', label: 'Profile', icon: <FaUser /> },
  ];

  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand 
            onClick={() => navigate('/zodiac')} 
            style={{ cursor: 'pointer' }}
            className="d-flex align-items-center"
          >
            <img src="/icon.png" alt="Buka" className="me-2" style={{ width: '40px', height: '40px', borderRadius: '7px' }} />
            <h3 className="mb-0 text-purple">Buka</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {navItems.map((item) => (
                <Nav.Link
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`mx-2 ${location.pathname === item.path ? 'active-nav' : ''}`}
                >
                  <div className="d-flex align-items-center gap-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </Nav.Link>
              ))}
              <Button
                variant="outline-danger"
                onClick={handleLogout}
                className="ms-2 d-flex align-items-center gap-2"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className="p-0">
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
