import React, { useState } from "react";
import { Container, Card, Button, Collapse } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./FAQAccordion.css";

const faqs = [
  { question: "What is React?", answer: "React is a JavaScript library for building user interfaces." },
  { question: "How does useState work?", answer: "useState is a Hook that allows you to have state variables in functional components." },
  { question: "What is JSX?", answer: "JSX is a syntax extension for JavaScript that looks similar to XML or HTML." }
];

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-background">
      <Container className="faq-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <Card key={index} className={`faq-card ${activeIndex === index ? "active" : ""}`}>
            <Card.Header>
              <Button className="faq-button" onClick={() => toggleFAQ(index)}>
                {faq.question}
                {activeIndex === index ? <FaMinus className="icon" /> : <FaPlus className="icon" />}
              </Button>
            </Card.Header>
            <Collapse in={activeIndex === index}>
              <Card.Body className="faq-answer">{faq.answer}</Card.Body>
            </Collapse>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default FAQAccordion;
