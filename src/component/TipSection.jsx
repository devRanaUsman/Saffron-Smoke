const TipSection = ({ heading, image, paragraphs }) => {
  //   if (!heading) {
  //     return null;
  //   }

  return (
    <section className="mb-5">
      <h2
        style={{
          fontSize: "1.8rem",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "1.5rem",
        }}
      >
        {heading}
      </h2>

      {image && (
        <div className="text-center mb-4">
          <img
            src={image}
            alt={heading}
            className="img-fluid rounded shadow-sm"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}

      {paragraphs && paragraphs.length > 0 && (
        <div>
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              style={{
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555",
                marginBottom: "1.5rem",
                textAlign: "justify",
                borderLeft: "4px solid #4a4848",
                paddingLeft: "1rem",
              }}
              dangerouslySetInnerHTML={{ __html: paragraph }}
            ></p>
          ))}
        </div>
      )}
    </section>
  );
};
export default TipSection;
