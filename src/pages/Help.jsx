import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { useContext, useEffect } from "react";
import DataContext from "../context/DataContext";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

function Help() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { theme } = useContext(DataContext);
  useEffect(() => {
    if (!user && !loading) {
      navigate("/signin");
    }

    if (user && !user.emailVerified) {
      navigate("/");
    }
  });

  if (loading) {
    return <Loading />;
  }

  if (user && user.emailVerified) {
    return (
      <div className={`App ${theme}`}>
        <Helmet>
          <title>Help</title>
        </Helmet>

        <Header />
        <main>{i18n.language === "ar" ? "  المساعده" : "Help"}</main>
        <Footer />
      </div>
    );
  }
}

export default Help;
