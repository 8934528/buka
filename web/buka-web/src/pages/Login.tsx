import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { authService } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      return;
    }
    
    setLoading(true);
    try {
      await authService.login(formData.email, formData.password);
      navigate('/zodiac');
    } catch (error) {
      // Error already handled in service
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={5}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-lg border-0 app-card-radius">
                <Card.Body className="p-5">
                  <div className="text-center mb-4">
                    <img src="/icon.png" alt="Buka" className="mb-3" style={{ width: '80px', height: '80px', borderRadius: '7px' }} />
                    <h2 className="text-purple fw-bold">Buka</h2>
                    <p className="text-muted">Discover Your Zodiac Sign</p>
                  </div>

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <div className="position-relative">
                        <FaEnvelope className="position-absolute text-muted" style={{ top: '12px', left: '12px' }} />
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          className="ps-5 py-2 rounded-3"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Password</Form.Label>
                      <div className="position-relative">
                        <FaLock className="position-absolute text-muted" style={{ top: '12px', left: '12px' }} />
                        <Form.Control
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter password"
                          className="ps-5 pe-5 py-2 rounded-3"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required
                        />
                        <div
                          className="position-absolute"
                          style={{ top: '10px', right: '12px', cursor: 'pointer' }}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                      </div>
                    </Form.Group>

                    <Button
                      type="submit"
                      className="w-100 py-2 rounded-3 fw-bold btn-purple"
                      disabled={loading}
                    >
                      {loading ? 'Logging in...' : 'Login'}
                    </Button>
                  </Form>

                  <div className="text-center mt-4">
                    <span className="text-muted">No account? </span>
                    <Link to="/register" className="text-purple text-decoration-none fw-bold">
                      Create one
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
