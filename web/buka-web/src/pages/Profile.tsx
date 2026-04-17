import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Spinner, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaCalendarAlt, FaStar, FaPen } from 'react-icons/fa';
import { userService } from '../services/userService';
import type { User } from '../types';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await userService.getProfile();
      setUser(data);
      setFormData({ name: data.name, email: data.email });
    } catch (error) {
      // Error handled in service
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await userService.updateProfile(formData);
      setUser(updated);
      setIsEditing(false);
    } catch (error) {
      // Error handled in service
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="purple" />
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg border-0 app-card-radius overflow-hidden">
              <div className="bg-purple text-white p-5 text-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="bg-white rounded-circle d-flex align-items-center justify-content-center mx-auto"
                  style={{ width: '120px', height: '120px' }}
                >
                  <FaUser size={50} className="text-purple" />
                </motion.div>
                <h2 className="fw-bold mt-3">{user?.name}</h2>
                <p className="mb-0 opacity-75">{user?.email}</p>
              </div>
              
              <Card.Body className="p-4">
                <div className="d-flex justify-content-end mb-3">
                  <Button
                    variant={isEditing ? 'secondary' : 'outline-purple'}
                    size="sm"
                    className="d-flex align-items-center gap-2"
                    onClick={() => {
                      if (isEditing && user) {
                        setFormData({ name: user.name, email: user.email });
                      }
                      setIsEditing(!isEditing);
                    }}
                  >
                    <FaPen />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </div>
                {isEditing ? (
                  <Form onSubmit={handleSave} className="mb-4">
                    <Row className="g-3">
                      <Col xs={12}>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </Col>
                      <Col xs={12}>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </Col>
                      <Col xs={12} className="d-flex justify-content-end">
                        <Button type="submit" variant="purple" disabled={saving}>
                          {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                ) : null}
                <Row className="g-3">
                  <Col xs={12}>
                    <div className="d-flex align-items-center gap-3 p-3 bg-light app-card-radius">
                      <FaUser className="text-purple" size={24} />
                      <div>
                        <small className="text-muted d-block">Full Name</small>
                        <strong>{user?.name}</strong>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="d-flex align-items-center gap-3 p-3 bg-light app-card-radius">
                      <FaEnvelope className="text-purple" size={24} />
                      <div>
                        <small className="text-muted d-block">Email Address</small>
                        <strong>{user?.email}</strong>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="d-flex align-items-center gap-3 p-3 bg-light app-card-radius">
                      <FaCalendarAlt className="text-purple" size={24} />
                      <div>
                        <small className="text-muted d-block">Member Since</small>
                        <strong>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</strong>
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="mt-4 p-3 bg-purple-light app-card-radius">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <FaStar className="text-purple" />
                    <h6 className="mb-0 fw-bold text-purple">Zodiac Stats</h6>
                  </div>
                  <Row className="text-center">
                    <Col xs={4}>
                      <div className="p-2">
                        <h4 className="text-purple mb-0">0</h4>
                        <small className="text-muted">Zodiacs Found</small>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="p-2">
                        <h4 className="text-purple mb-0">0</h4>
                        <small className="text-muted">History Entries</small>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="p-2">
                        <h4 className="text-purple mb-0">-</h4>
                        <small className="text-muted">Last Checked</small>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
