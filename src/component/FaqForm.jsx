import { useState, useEffect } from "react";

export default function FaqForm({ initialFaqs = [], onSave, onCancel }) {
  const [faqs, setFaqs] = useState(initialFaqs);

  // Ensure local state updates if the initial prop changes
  useEffect(() => {
    setFaqs(initialFaqs);
  }, [initialFaqs]);

  const handleFaqChange = (index, field, value) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (index) => {
    const newFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(newFaqs);
  };

  const handleSave = () => {
    // Filter out any empty question/answer pairs before saving
    const validFaqs = faqs.filter(
      (faq) => faq.question.trim() !== "" && faq.answer.trim() !== ""
    );
    onSave(validFaqs);
  };

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h3>Manage FAQs</h3>
      </div>
      <div className="card-body">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 p-3 border rounded">
            <div className="mb-3">
              <label htmlFor={`question-${index}`} className="form-label">
                Question
              </label>
              <input
                type="text"
                id={`question-${index}`}
                className="form-control"
                value={faq.question}
                onChange={(e) =>
                  handleFaqChange(index, "question", e.target.value)
                }
                placeholder="Enter the question"
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`answer-${index}`} className="form-label">
                Answer
              </label>
              <textarea
                id={`answer-${index}`}
                className="form-control"
                rows="3"
                value={faq.answer}
                onChange={(e) =>
                  handleFaqChange(index, "answer", e.target.value)
                }
                placeholder="Enter the answer"
              ></textarea>
            </div>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => removeFaq(index)}
            >
              Remove FAQ
            </button>
          </div>
        ))}

        <button className="btn btn-secondary mb-3" onClick={addFaq}>
          + Add New FAQ
        </button>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button className="btn btn-light" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save FAQs
          </button>
        </div>
      </div>
    </div>
  );
}
