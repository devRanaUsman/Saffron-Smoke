import React, { useState } from "react";
import axios from "axios";
import "./AddTipForm.css";

const AddTipForm = () => {
  const [tip, setTip] = useState({
    title: "",
    mainImage: "",
    intro: "",
    content: [{ type: "paragraph", content: "", level: 1 }],
    faqs: [{ question: "", answer: "" }],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const contentTypes = ["heading", "subheading", "paragraph", "image"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTip((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = (index, field, value) => {
    setTip((prev) => ({
      ...prev,
      content: prev.content.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addContentBlock = () => {
    setTip((prev) => ({
      ...prev,
      content: [...prev.content, { type: "paragraph", content: "", level: 1 }],
    }));
  };

  const removeContentBlock = (index) => {
    setTip((prev) => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index),
    }));
  };

  const moveContentBlock = (index, direction) => {
    const newContent = [...tip.content];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < newContent.length) {
      [newContent[index], newContent[newIndex]] = [
        newContent[newIndex],
        newContent[index],
      ];
      setTip((prev) => ({
        ...prev,
        content: newContent,
      }));
    }
  };

  const handleFaqChange = (index, field, value) => {
    setTip((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq
      ),
    }));
  };

  const addFaq = () => {
    setTip((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  const removeFaq = (index) => {
    setTip((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Clean up the data
      const cleanTip = {
        ...tip,
        content: tip.content.filter((item) => item.content.trim() !== ""),
        faqs: tip.faqs.filter(
          (faq) => faq.question.trim() !== "" && faq.answer.trim() !== ""
        ),
      };

      const apiUrl = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/tips/admin/add` : "http://localhost:3002/api/tips/admin/add";
      const response = await axios.post(apiUrl, cleanTip);

      setMessage("Tip added successfully!");

      // Reset form
      setTip({
        title: "",
        mainImage: "",
        intro: "",
        content: [{ type: "paragraph", content: "", level: 1 }],
        faqs: [{ question: "", answer: "" }],
      });
    } catch (error) {
      console.error("Error adding tip:", error);
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getContentTypeLabel = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="add-tip-form">
      <div className="form-header">
        <h1>Add New Cooking Tip</h1>
        <p>Share valuable cooking tips and tricks with your audience</p>
      </div>

      {message && (
        <div
          className={`message ${
            message.includes("Error") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="tip-form">
        {/* Basic Information */}
        <div className="form-section">
          <h2>Basic Information</h2>

          <div className="form-group">
            <label htmlFor="title">Tip Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={tip.title}
              onChange={handleInputChange}
              required
              placeholder="Enter a descriptive title for your cooking tip"
            />
          </div>

          <div className="form-group">
            <label htmlFor="mainImage">Main Image URL *</label>
            <input
              type="url"
              id="mainImage"
              name="mainImage"
              value={tip.mainImage}
              onChange={handleInputChange}
              required
              placeholder="https://example.com/tip-image.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="intro">Introduction *</label>
            <textarea
              id="intro"
              name="intro"
              value={tip.intro}
              onChange={handleInputChange}
              required
              rows="4"
              placeholder="Write a brief introduction explaining what this tip is about and why it's useful"
            />
          </div>
        </div>

        {/* Content Blocks */}
        <div className="form-section">
          <h2>Tip Content</h2>
          <p className="section-help">
            Build your tip content using different content blocks. Explain the
            technique, provide step-by-step instructions, and include helpful
            images.
          </p>

          {tip.content.map((block, index) => (
            <div key={index} className="content-block">
              <div className="content-block-header">
                <div className="content-controls">
                  <select
                    value={block.type}
                    onChange={(e) =>
                      handleContentChange(index, "type", e.target.value)
                    }
                    className="type-select"
                  >
                    {contentTypes.map((type) => (
                      <option key={type} value={type}>
                        {getContentTypeLabel(type)}
                      </option>
                    ))}
                  </select>

                  {(block.type === "heading" ||
                    block.type === "subheading") && (
                    <select
                      value={block.level}
                      onChange={(e) =>
                        handleContentChange(
                          index,
                          "level",
                          parseInt(e.target.value)
                        )
                      }
                      className="level-select"
                    >
                      <option value={1}>H1</option>
                      <option value={2}>H2</option>
                      <option value={3}>H3</option>
                      <option value={4}>H4</option>
                      <option value={5}>H5</option>
                      <option value={6}>H6</option>
                    </select>
                  )}
                </div>

                <div className="block-actions">
                  <button
                    type="button"
                    onClick={() => moveContentBlock(index, "up")}
                    disabled={index === 0}
                    className="move-btn"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveContentBlock(index, "down")}
                    disabled={index === tip.content.length - 1}
                    className="move-btn"
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => removeContentBlock(index)}
                    disabled={tip.content.length === 1}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="content-input">
                {block.type === "image" ? (
                  <input
                    type="url"
                    value={block.content}
                    onChange={(e) =>
                      handleContentChange(index, "content", e.target.value)
                    }
                    placeholder="Enter image URL"
                    className="block-input"
                  />
                ) : (
                  <textarea
                    value={block.content}
                    onChange={(e) =>
                      handleContentChange(index, "content", e.target.value)
                    }
                    placeholder={
                      block.type === "heading" || block.type === "subheading"
                        ? "Enter heading text"
                        : "Enter paragraph content - explain the tip step by step"
                    }
                    rows={block.type === "paragraph" ? 4 : 2}
                    className="block-input"
                  />
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addContentBlock}
            className="add-content-btn"
          >
            + Add Content Block
          </button>
        </div>

        {/* FAQs Section */}
        <div className="form-section">
          <h2>Frequently Asked Questions (Optional)</h2>
          <p className="section-help">
            Add common questions about this cooking tip to help readers
            understand better.
          </p>

          {tip.faqs.map((faq, index) => (
            <div key={index} className="faq-block">
              <div className="faq-header">
                <span className="faq-number">FAQ #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeFaq(index)}
                  disabled={tip.faqs.length === 1}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>

              <div className="form-group">
                <label>Question</label>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) =>
                    handleFaqChange(index, "question", e.target.value)
                  }
                  placeholder="Why does this tip work?"
                />
              </div>

              <div className="form-group">
                <label>Answer</label>
                <textarea
                  value={faq.answer}
                  onChange={(e) =>
                    handleFaqChange(index, "answer", e.target.value)
                  }
                  rows="3"
                  placeholder="Provide a detailed explanation"
                />
              </div>
            </div>
          ))}

          <button type="button" onClick={addFaq} className="add-faq-btn">
            + Add FAQ
          </button>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Publishing Tip..." : "Publish Cooking Tip"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTipForm;
