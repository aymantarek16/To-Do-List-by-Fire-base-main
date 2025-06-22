import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../components/Loading";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      if (user.emailVerified) {
        navigate("/");
      }
    }
  });

  // ===================== loading =====================
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return (
      <>
        <Header />

        <main>
          <form>
            <p style={{ fontSize: "23px", marginBottom: "22px" }}>
              Create a new account <span>🧡</span>{" "}
            </p>

            <input
              onChange={(eo) => {
                setuserName(eo.target.value);
              }}
              required
              placeholder="User Name : "
              type="userName"
            />

            <input
              onChange={(eo) => {
                setEmail(eo.target.value);
              }}
              required
              placeholder=" E-mail : "
              type="email"
            />
            <input
              onChange={(eo) => {
                setPassword(eo.target.value);
              }}
              required
              placeholder=" Password : "
              type="password"
            />

            <button
              onClick={(eo) => {
                eo.preventDefault();
                createUserWithEmailAndPassword(auth, email, password)
                  .then((userCredential) => {
                    // SignUp in Done
                    const user = userCredential.user;
                    console.log(user);

                    sendEmailVerification(auth.currentUser).then(() => {
                      // Email verification sent!
                    });

                    updateProfile(auth.currentUser, {
                      displayName: userName,
                    })
                      .then(() => {
                        // Profile updated
                        navigate("/");
                      })
                      .catch((error) => {
                        // An error occurred
                        console.log(error.code);
                      });
                  })
                  // SignUp in Error
                  .catch((error) => {
                    const errorCode = error.code;
                    console.log(errorCode);
                  });
              }}
            >
              Sign up
            </button>
            <p className="account">
              Already hava an account <Link to="/signin"> Sign-in</Link>
            </p>
          </form>
        </main>
        <Footer />
      </>
    );
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <div>
          <Header />
          <main>
            <p>We Send an email to verify your Account</p>
            <button
              className="btn-red"
              onClick={() => {
                sendEmailVerification(auth.currentUser).then(() => {
                  // Email verification sent!
                  alert(
                    "A confirmation message has been sent to your email. Please go there and then refresh this page"
                  );
                });
              }}
            >
              Send again
            </button>
          </main>
          <Footer />
        </div>
      );
    }
  }
};

export default Signup;
