import { useState } from "react";

export default function FaqSection({ faqs, accordionId = "faqAccordion" }) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) =>
    setOpenIndex((prev) => (prev === index ? null : index));

  return (
    <div
      className="mt-5"
      style={{
        borderTop: "1px solid #e0e0e0",
        paddingTop: "2.5rem",
        paddingBottom: "1rem",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          fontWeight: "bold",
          color: "#333",
          fontSize: "2.2rem",
        }}
      >
        FAQS
      </h2>
      <div className="accordion accordion-flush" id={accordionId}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const headingId = `heading-${accordionId}-${index}`;
          const collapseId = `collapse-${accordionId}-${index}`;
          return (
            <div
              className="accordion-item"
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                marginBottom: "1rem",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                overflow: "hidden",
              }}
            >
              <h2 className="accordion-header" id={headingId}>
                <button
                  className={`accordion-button ${isOpen ? "" : "collapsed"}`}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={collapseId}
                  onClick={() => toggle(index)}
                  style={{
                    fontWeight: "600",
                    fontSize: "1.1rem",
                    borderRadius: "8px 8px 0 0",
                    transition: "all 0.3s ease",
                    backgroundColor: isOpen ? "#f8f9fa" : "#fff",
                  }}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={collapseId}
                className="accordion-collapse"
                style={{
                  maxHeight: isOpen ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease-in-out, opacity 0.3s ease",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div
                  className="accordion-body"
                  style={{
                    lineHeight: "1.7",
                    padding: isOpen ? "1rem 1.25rem" : "0 1.25rem",
                    transition: "padding 0.3s ease",
                  }}
                >
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
