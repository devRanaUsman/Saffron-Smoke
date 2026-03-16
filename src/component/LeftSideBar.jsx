import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaTwitter,
} from "react-icons/fa";

function LeftSocialBar() {
  const socialItemBaseStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    color: "#fff",
    margin: "8px 0",
    textDecoration: "none",
    transition: "all 0.2s ease-in-out",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15)",
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
        "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
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
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "0",
        transform: "translateY(-50%)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0.5rem",
        backgroundColor: "transparent",
      }}
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
            ...socialItemBaseStyle,
            background: isGradient ? bgColor : undefined,
            backgroundColor: !isGradient ? bgColor : undefined,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.15)";
          }}
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  );
}

export default LeftSocialBar;
