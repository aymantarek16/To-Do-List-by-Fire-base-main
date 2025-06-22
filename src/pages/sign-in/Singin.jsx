import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Style/signup-sigin.css";
import "../../Style/modal.css";

import { signInWithEmailAndPassword, getAuth, sendPasswordResetEmail  } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../components/Loading";
import Modal from "../../shared/Modal";

const Signin = () => {
  const [message, setMessage] = useState(false);
  const [resetPass, setresetPass] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setshowModal] = useState(false);
  const auth = getAuth();

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      if (user.emailVerified) {
        navigate("/");
      }
    }
  });

  const forgetPassword = () => {
    setshowModal(true);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />

      <main>
        {showModal && (
          <Modal setshowModal={setshowModal}>
            <input
              onClick={(e) => setresetPass(e.target.value)}
              required
              placeholder=" E-mail : "
              type="email"
            />
            <button
              onClick={(eo) => {
                eo.preventDefault();
                sendPasswordResetEmail(auth, resetPass)
                  .then(() => {
                    // Password reset email sent!
                    // ..
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    console.log(errorCode);
                  });

                // setshowForm("");
                setMessage(true);
              }}
            >
              Reset password
            </button>
            {message && <p>Please check your email to reset your password</p>}
          </Modal>
        )}

        <form>
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
              signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  // SignIn in Done
                  const user = userCredential.user;
                  console.log(user);
                  navigate("/");
                })
                // SignIn in Error
                .catch((error) => {
                  const errorCode = error.code;
                  setError(errorCode);
                });
            }}
          >
            Sign in
          </button>
          <p className="account">
            Don't hava an account <Link to="/signup"> Sign-up</Link>
          </p>
          <p
            className="forget_desk mt"
            onClick={() => {
              forgetPassword();
            }}
          >
            Forget password ?
          </p>
          {<p>{error}</p>}
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Signin;
