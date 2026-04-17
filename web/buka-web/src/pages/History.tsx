import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHistory as FaHistoryIcon, FaStar, FaHeart, FaExclamationTriangle, FaPalette } from 'react-icons/fa';
import { zodiacService } from '../services/zodiacService';
import type { HistoryItem } from '../types';

const History = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await zodiacService.getHistory();
      setHistory(data);
    } catch (error) {
      // Error handled in service
    } finally {
      setLoading(false);
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
        <Col xs={12} xl={10}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-sm border-0 app-card-radius mb-4">
              <Card.Body className="p-4 text-center">
                <FaHistoryIcon size={40} className="text-purple mb-2" />
                <h3 className="text-purple fw-bold">Your Zodiac History</h3>
                <p className="text-muted">Track all the zodiac signs you've discovered</p>
              </Card.Body>
            </Card>
          </motion.div>

          {history.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="text-center border-0 shadow-sm app-card-radius">
                <Card.Body className="p-5">
                  <FaStar size={60} className="text-muted mb-3" />
                  <h5 className="text-muted">No history yet</h5>
                  <p className="text-muted">Find your zodiac sign to see it here</p>
                </Card.Body>
              </Card>
            </motion.div>
          ) : (
            <Row className="g-3">
              <AnimatePresence>
                {history.map((item, index) => (
                  <Col xs={12} md={6} lg={4} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <Card className="shadow-sm border-0 app-card-radius h-100">
                        <Card.Body className="p-4">
                          <div className="text-center mb-3">
                            <div className="bg-purple-light rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{ width: '70px', height: '70px' }}>
                              <FaStar size={30} className="text-purple" />
                            </div>
                            <h5 className="fw-bold text-purple mt-2 mb-0">{item.sign}</h5>
                            <small className="text-muted">{new Date(item.createdAt).toLocaleDateString()}</small>
                          </div>

                          <div className="d-flex gap-2 mb-2">
                            <FaHeart className="text-purple mt-1" size={14} />
                            <div>
                              <small className="text-muted d-block">Strengths</small>
                              <small className="fw-bold">{item.strengths}</small>
                            </div>
                          </div>

                          <div className="d-flex gap-2 mb-2">
                            <FaExclamationTriangle className="text-purple mt-1" size={14} />
                            <div>
                              <small className="text-muted d-block">Weaknesses</small>
                              <small className="fw-bold">{item.weaknesses}</small>
                            </div>
                          </div>

                          <div className="d-flex gap-2">
                            <FaPalette className="text-purple mt-1" size={14} />
                            <div>
                              <small className="text-muted d-block">Colors</small>
                              <small className="fw-bold">{item.colors}</small>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </AnimatePresence>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default History;
