import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserPlus } from 'react-icons/fa';
import { authService } from '../services/authService';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return;
    }
    
    if (formData.password.length < 6) {
      return;
    }

    setLoading(true);
    try {
      await authService.register(formData.name, formData.email, formData.password);
      navigate('/login');
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
              <Card className="shadow-lg border-0 rounded-4">
                <Card.Body className="p-5">
                  <div className="text-center mb-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="bg-purple rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{ width: '80px', height: '80px' }}
                    >
                      <FaUserPlus size={40} color="white" />
                    </motion.div>
                    <h2 className="text-purple fw-bold">Join Buka</h2>
                    <p className="text-muted">Create your account</p>
                  </div>

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <div className="position-relative">
                        <FaUser className="position-absolute text-muted" style={{ top: '12px', left: '12px' }} />
                        <Form.Control
                          type="text"
                          placeholder="Enter name"
                          className="ps-5 py-2 rounded-3"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                    </Form.Group>

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

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <div className="position-relative">
                        <FaLock className="position-absolute text-muted" style={{ top: '12px', left: '12px' }} />
                        <Form.Control
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter password (min 6 characters)"
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

                    <Form.Group className="mb-4">
                      <Form.Label>Confirm Password</Form.Label>
                      <div className="position-relative">
                        <FaLock className="position-absolute text-muted" style={{ top: '12px', left: '12px' }} />
                        <Form.Control
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm password"
                          className="ps-5 pe-5 py-2 rounded-3"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          required
                        />
                        <div
                          className="position-absolute"
                          style={{ top: '10px', right: '12px', cursor: 'pointer' }}
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                      </div>
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="purple"
                      className="w-100 py-2 rounded-3 fw-bold"
                      disabled={loading}
                    >
                      {loading ? 'Creating account...' : 'Sign Up'}
                    </Button>
                  </Form>

                  <div className="text-center mt-4">
                    <span className="text-muted">Already have an account? </span>
                    <Link to="/login" className="text-purple text-decoration-none fw-bold">
                      Login
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

export default Register;
