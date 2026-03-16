import React, { useState } from "react";
import axios from "axios";
import "./AddBlogForm.css";

const AddBlogForm = () => {
  const [blog, setBlog] = useState({
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
    setBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = (index, field, value) => {
    setBlog((prev) => ({
      ...prev,
      content: prev.content.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addContentBlock = () => {
    setBlog((prev) => ({
      ...prev,
      content: [...prev.content, { type: "paragraph", content: "", level: 1 }],
    }));
  };

  const removeContentBlock = (index) => {
    setBlog((prev) => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index),
    }));
  };

  const moveContentBlock = (index, direction) => {
    const newContent = [...blog.content];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < newContent.length) {
      [newContent[index], newContent[newIndex]] = [
        newContent[newIndex],
        newContent[index],
      ];
      setBlog((prev) => ({
        ...prev,
        content: newContent,
      }));
    }
  };

  const handleFaqChange = (index, field, value) => {
    setBlog((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq
      ),
    }));
  };

  const addFaq = () => {
    setBlog((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  const removeFaq = (index) => {
    setBlog((prev) => ({
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
      const cleanBlog = {
        ...blog,
        content: blog.content.filter((item) => item.content.trim() !== ""),
        faqs: blog.faqs.filter(
          (faq) => faq.question.trim() !== "" && faq.answer.trim() !== ""
        ),
      };

      const apiUrl = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/blogs/admin/add` : "http://localhost:3002/api/blogs/admin/add";
      const response = await axios.post(apiUrl, cleanBlog);

      setMessage("Blog post added successfully!");

      // Reset form
      setBlog({
        title: "",
        mainImage: "",
        intro: "",
        content: [{ type: "paragraph", content: "", level: 1 }],
        faqs: [{ question: "", answer: "" }],
      });
    } catch (error) {
      console.error("Error adding blog:", error);
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getContentTypeLabel = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="add-blog-form">
      <div className="form-header">
        <h1>Add New Blog Post</h1>
        <p>Create engaging blog content with rich text and media</p>
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

      <form onSubmit={handleSubmit} className="blog-form">
        {/* Basic Information */}
        <div className="form-section">
          <h2>Basic Information</h2>

          <div className="form-group">
            <label htmlFor="title">Blog Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={blog.title}
              onChange={handleInputChange}
              required
              placeholder="Enter an engaging blog title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="mainImage">Main Image URL *</label>
            <input
              type="url"
              id="mainImage"
              name="mainImage"
              value={blog.mainImage}
              onChange={handleInputChange}
              required
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="intro">Introduction *</label>
            <textarea
              id="intro"
              name="intro"
              value={blog.intro}
              onChange={handleInputChange}
              required
              rows="4"
              placeholder="Write a compelling introduction that summarizes your blog post"
            />
          </div>
        </div>

        {/* Content Blocks */}
        <div className="form-section">
          <h2>Blog Content</h2>
          <p className="section-help">
            Create your blog content using different content blocks. Mix
            headings, paragraphs, and images to create engaging content.
          </p>

          {blog.content.map((block, index) => (
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
                    disabled={index === blog.content.length - 1}
                    className="move-btn"
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => removeContentBlock(index)}
                    disabled={blog.content.length === 1}
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
                        : "Enter paragraph content"
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
            Add FAQs to provide additional value and improve SEO.
          </p>

          {blog.faqs.map((faq, index) => (
            <div key={index} className="faq-block">
              <div className="faq-header">
                <span className="faq-number">FAQ #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeFaq(index)}
                  disabled={blog.faqs.length === 1}
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
                  placeholder="What is your question?"
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
                  placeholder="Provide a detailed answer"
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
            {loading ? "Publishing Blog..." : "Publish Blog Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogForm;
