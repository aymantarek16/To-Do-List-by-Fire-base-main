import { useTranslation } from "react-i18next";
import "../Style/footer.css";
const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <footer>
        <p>
          {i18n.language === "ar"
            ? "مصمم ومطور بواسطه المهندس ايمن طارق"
            : `Designed and developed by Ayman Tarek`}
            <span>🧡</span> © 2024
        </p>

        <div className="socialIcon">
          <a href="https://www.facebook.com/" target="blank">
            <i className="fa-brands fa-facebook"></i>
          </a>

          <a
            href="https://www.linkedin.com/in/ayman-tarek-617b21229/"
            target="blank"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>

          <a href="https://t.me/aymantarek16" target="blank">
            <i className="fa-brands fa-telegram"></i>
          </a>

          <a href="https://wa.me/201148618451" target="blank">
            <i className="fa-brands fa-whatsapp"></i>
          </a>

          <a href="https://www.instagram.com/?hl=ar" target="blank">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
