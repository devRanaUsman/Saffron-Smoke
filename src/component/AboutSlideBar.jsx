import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaTwitter,
} from "react-icons/fa";

/**
 * Right-side About card used next to Popular Recipes
 * With colorful social icons matching real brand colors
 */
export default function AboutSidebar() {
  const avatarUrl =
    "https://therecipespk.com/wp-content/uploads/2020/04/Abrish-Recipes-PK-e1591648987879.png";

  const sectionStyle = {
    backgroundColor: "#ffffff",
    border: "1px solid #e9ecef",
    borderRadius: "8px",
    padding: "1.25rem",
    color: "#333",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    position: "relative",
    top: "53px",
    height: "100%",
    width: "100%",
    maxWidth: "100%", // Full width of its container
    textAlign: "center", // Center align all content
  };

  const hrStyle = {
    border: 0,
    height: "1px",
    backgroundColor: "#e9ecef",
    margin: "1rem 0",
  };

  const baseIconStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    color: "#fff",
    marginRight: "10px",
    textDecoration: "none",
    transition: "all 0.2s ease",
  };

  const socialHoverStyle = {
    transform: "scale(1.1)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  };

  const socials = [
    {
      Icon: FaFacebookF,
      label: "Facebook",
      href: "https://www.facebook.com/TheRecipesPakistan/",
      bgColor: "#3b5998",
    },
    {
      Icon: FaTwitter,
      label: "Twitter",
      href: "https://twitter.com/Recipesnbeauty",
      bgColor: "#1da1f2",
    },
    {
      Icon: FaPinterestP,
      label: "Pinterest",
      href: "https://www.pinterest.com/therecipespk/",
      bgColor: "#bd081c",
    },
    {
      Icon: FaInstagram,
      label: "Instagram",
      href: "https://www.instagram.com/therecipespk",
      bgColor:
        "radial-gradient(circle at 30% 107%, #fdf497 0%, #fd5949 50%, #d6249f 70%, #285AEB 100%)",
      isGradient: true,
    },
    {
      Icon: FaLinkedinIn,
      label: "LinkedIn",
      href: "https://pk.linkedin.com/in/the-recipes-pakistan-23732882",
      bgColor: "#0077b5",
    },
  ];

  return (
    <aside
      aria-label="About The Recipes PK"
      style={{ height: "100%", width: "100%" }}
    >
      <div style={sectionStyle}>
        <div className="text-center">
          <img
            src={avatarUrl}
            alt="About author"
            style={{
              borderRadius: "50%",
              width: "50%",
              objectFit: "cover",
              display: "inline-block",
            }}
          />
        </div>

        <h5
          className="text-center"
          style={{
            letterSpacing: ".06em",
            fontStyle: "serif",
            marginTop: "1.5rem",
            marginBottom: "1.5rem",
            fontWeight: "bold",
            color: "#495057",
          }}
        >
          ABOUT THE RECIPES PK
        </h5>

        <p
          style={{
            fontSize: "1.2rem",
            textAlign: "center",
            lineHeight: 1.6,
            color: "#555",
            borderBottom: "1px solid black",
            borderStyle: "dotted",
            paddingBottom: "4rem",
            marginBottom: "4rem",
          }}
        >
          Welcome to our recipe blog! We’re passionate about creating and
          sharing delicious, easy-to-follow recipes that anyone can make at
          home. From comforting classics to exciting new dishes, we aim to
          inspire your inner chef and make every meal a memorable one.
        </p>

        <hr style={hrStyle} />

        <div
          className="d-flex align-items-center justify-center flex-end relative"
          aria-label="Social links"
        >
          {socials.map(({ Icon, label, href, bgColor, isGradient }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...baseIconStyle,
                background: isGradient ? bgColor : undefined,
                backgroundColor: !isGradient ? bgColor : undefined,
              }}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, socialHoverStyle)
              }
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, {
                  ...baseIconStyle,
                  background: isGradient ? bgColor : undefined,
                  backgroundColor: !isGradient ? bgColor : undefined,
                })
              }
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
