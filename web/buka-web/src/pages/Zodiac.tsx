import { useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaMagic, FaHeart, FaExclamationTriangle, FaPalette } from 'react-icons/fa';
import { zodiacService } from '../services/zodiacService';
import type { ZodiacResult } from '../types';

const zodiacSigns = [
  { sign: "Aries", dates: "Mar 21 - Apr 19", emoji: "🐏", color: "#d9534f", image: "/images/zodiac/aries.png" },
  { sign: "Taurus", dates: "Apr 20 - May 20", emoji: "🐂", color: "#4caf50", image: "/images/zodiac/taurus.png" },
  { sign: "Gemini", dates: "May 21 - Jun 20", emoji: "👥", color: "#f4c542", image: "/images/zodiac/gemini.png" },
  { sign: "Cancer", dates: "Jun 21 - Jul 22", emoji: "🦀", color: "#c0c0c0", image: "/images/zodiac/cancer.png" },
  { sign: "Leo", dates: "Jul 23 - Aug 22", emoji: "🦁", color: "#ffb300", image: "/images/zodiac/leo.png" },
  { sign: "Virgo", dates: "Aug 23 - Sep 22", emoji: "🌾", color: "#8d8d8d", image: "/images/zodiac/virgo.png" },
  { sign: "Libra", dates: "Sep 23 - Oct 22", emoji: "⚖️", color: "#ff7eb6", image: "/images/zodiac/libra.png" },
  { sign: "Scorpio", dates: "Oct 23 - Nov 21", emoji: "🦂", color: "#1f1f1f", image: "/images/zodiac/scorpio.png" },
  { sign: "Sagittarius", dates: "Nov 22 - Dec 21", emoji: "🏹", color: "#7e57c2", image: "/images/zodiac/sagittarius.png" },
  { sign: "Capricorn", dates: "Dec 22 - Jan 19", emoji: "🐐", color: "#8d6e63", image: "/images/zodiac/capricorn.png" },
  { sign: "Aquarius", dates: "Jan 20 - Feb 18", emoji: "💧", color: "#1e88e5", image: "/images/zodiac/aquarius.png" },
  { sign: "Pisces", dates: "Feb 19 - Mar 20", emoji: "🐟", color: "#26a69a", image: "/images/zodiac/pisces.png" },
];

const Zodiac = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [zodiacResult, setZodiacResult] = useState<ZodiacResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setZodiacResult(null);
  };

  const calculateZodiac = async () => {
    if (!selectedDate) return;
    
    const date = new Date(selectedDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    setLoading(true);
    setHasSearched(true);
    try {
      const result = await zodiacService.getZodiac(month, day);
      setZodiacResult(result);
    } catch (error) {
      // Error handled in service
    } finally {
      setLoading(false);
    }
  };

  const matchedSign = zodiacResult ? zodiacSigns.find((z) => z.sign === zodiacResult.sign) : null;
  const moodColor = matchedSign?.color || '#6f42c1';

  return (
    <div
      className="min-vh-100 w-100 py-4"
      style={{ background: `linear-gradient(135deg, ${moodColor}22 0%, ${moodColor}44 100%)` }}
    >
      <Container fluid className="px-3 px-md-4">
        <Row className="justify-content-center">
          <Col xs={12} xl={10}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-sm border-0 app-card-radius mb-4">
              <Card.Body className="p-4">
                <h3 className="text-purple fw-bold mb-3">Find Your Zodiac Sign</h3>
                <Row className="g-3">
                  <Col xs={12} md={8}>
                    <div className="position-relative">
                      <FaCalendarAlt className="position-absolute text-purple" style={{ top: '12px', left: '12px' }} />
                      <input
                        type="date"
                        className="form-control ps-5 py-2 app-card-radius"
                        value={selectedDate}
                        onChange={handleDateChange}
                        style={{ border: '1px solid #dee2e6' }}
                      />
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <Button
                      variant="purple"
                      onClick={calculateZodiac}
                      disabled={!selectedDate || loading}
                      className="w-100 py-2 app-card-radius d-flex align-items-center justify-content-center gap-2"
                    >
                      <FaMagic />
                      {loading ? 'Finding...' : 'Find My Zodiac'}
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </motion.div>

          <AnimatePresence>
            {zodiacResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <Card className="shadow-lg border-0 app-card-radius overflow-hidden">
                  <div className="text-white p-4 text-center" style={{ backgroundColor: moodColor }}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      style={{ fontSize: '60px' }}
                    >
                      {zodiacSigns.find(z => z.sign === zodiacResult.sign)?.emoji || '⭐'}
                    </motion.div>
                    <h2 className="fw-bold mt-2">{zodiacResult.sign}</h2>
                  </div>
                  <Card.Body className="p-4">
                    {matchedSign ? (
                      <div className="text-center mb-4">
                        <img
                          src={matchedSign.image}
                          alt={matchedSign.sign}
                          style={{ width: '180px', maxWidth: '100%' }}
                        />
                      </div>
                    ) : null}
                    <Row className="g-3">
                      <Col xs={12}>
                        <div className="d-flex align-items-start gap-3">
                          <FaHeart className="text-purple mt-1" size={20} />
                          <div>
                            <h6 className="text-muted mb-1">Strengths</h6>
                            <p className="mb-0 fw-bold">{zodiacResult.strengths}</p>
                          </div>
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div className="d-flex align-items-start gap-3">
                          <FaExclamationTriangle className="text-purple mt-1" size={20} />
                          <div>
                            <h6 className="text-muted mb-1">Weaknesses</h6>
                            <p className="mb-0 fw-bold">{zodiacResult.weaknesses}</p>
                          </div>
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div className="d-flex align-items-start gap-3">
                          <FaPalette className="text-purple mt-1" size={20} />
                          <div>
                            <h6 className="text-muted mb-1">Colors</h6>
                            <p className="mb-0 fw-bold">{zodiacResult.colors}</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {!zodiacResult && !selectedDate && !hasSearched && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-center text-muted mb-3">Zodiac Signs</h4>
              <Row className="g-3">
                {zodiacSigns.map((zodiac, index) => (
                  <Col xs={6} md={4} lg={3} key={index}>
                    <Card className="text-center border-0 shadow-sm app-card-radius h-100">
                      <Card.Body className="p-3">
                        <div style={{ fontSize: '32px' }}>{zodiac.emoji}</div>
                        <h6 className="fw-bold mt-2 mb-1">{zodiac.sign}</h6>
                        <small className="text-muted">{zodiac.dates}</small>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </motion.div>
          )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Zodiac;
