import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import "../Style/header.css";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation(); 
  const [user] = useAuthState(auth);
  //  ================== useContext ================== //
  const { theme, ToggleTheme } = useContext(DataContext);

  return (
    <>
      <header className="hide-when-mobile">
        <h1>
          <Link to="/">FaceTime</Link>
        </h1>

        {/*=================== Dark Mode Button =================== */}
        <div
          className="toggleTheme"
          to="/Html"
          onClick={() => ToggleTheme(theme === "light" ? "dark" : "light")}
        >
          <i
            className={theme === "light" ? "fa fa-moon-o" : "fa fa-sun-o"}
            aria-hidden="true"
          />
        </div>

        {/* Links Other Pages */}
        <ul className="flex">
          <li className="main-list lang">
            <p className="languageText">{t("lang")}</p>

            <ul className="lang-box">
              <li
                onClick={() => {
                  i18n.changeLanguage("ar");
                }}
                dir="rtl"
              >
                <p> العربية</p>
                {i18n.language === "ar" && (
                  <i className="fa-solid fa-check"></i>
                )}
              </li>

              <li
                onClick={() => {
                  i18n.changeLanguage("en");
                }}
              >
                <p>English</p>

                {i18n.language === "en" && (
                  <i className="fa-solid fa-check"></i>
                )}
              </li>
            </ul>
          </li>
          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signin">
                {t("Sign-in")}
              </NavLink>
            </li>
          )}

          {!user && (
            <li className="main-list">
              <Link className="main-link" to="/signup">
                {t("Sign-up")}
              </Link>
            </li>
          )}

          {user && (
            <li
              className="main-list"
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    // Sign-out successful.
                    console.log("Sign-out successful.");
                  })
                  .catch((error) => {
                    // An error happened.
                  });
              }}
            >
              <Link className="main-link" to={"/"}>
                {t("signout")}
              </Link>
            </li>
          )}

          {user && (
            <div className="flex">
              <li className="main-list">
                <NavLink className="main-link" to="/Profile">
                  {t("Profile")}
                </NavLink>
              </li>

              <li className="main-list">
                <NavLink className="main-link" to="/Help">
                  {t("Help")}
                </NavLink>
              </li>

              {/* <li className="main-list">
            <NavLink className="main-link" to="/JavaScript">
              JavaScript
            </NavLink>
            <ul className="sub-ul sub-of-js">
              <li>
                <a href="">coming soon🔥</a>
              </li>
            </ul>
          </li> */}
            </div>
          )}
        </ul>
      </header>
    </>
  );
};

export default Header;
