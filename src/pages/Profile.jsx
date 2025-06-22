import { auth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAuth, deleteUser } from "firebase/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../Style/profile.css";
import Loading from "../components/Loading";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

function Profile() {
  const { t, i18n } = useTranslation();
  const auth = getAuth();

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const users = auth.currentUser;

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
  if (error) {
    return (
      <div>
        <p>Error : {error}</p>
      </div>
    );
  }

  if (user) {
    return (
      <>
        <Header />
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <main className="profile">
          <div className="profileCard">
            <h1>{t("Account Details")}</h1>
            <p>
              {t("Email")} : {user.email}
            </p>
            <p>
              {t("UserName")} : {user.displayName}
            </p>
            <p>
              {t("Last Sign-in")} {": at "}
              <Moment fromNow ago date={user.metadata.lastSignInTime} />
            </p>
            <p>
              {t("Account Created")} {": at "}
              <Moment fromNow ago date={user.metadata.creationTime} />
            </p>

            <button
              className="btn-red"
              onClick={() => {
                deleteUser(users)
                  .then(() => {
                    // User deleted.
                  })
                  .catch((error) => {
                    // An error ocurred
                  });
              }}
            >
              {t("Delete account")}
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}

export default Profile;
