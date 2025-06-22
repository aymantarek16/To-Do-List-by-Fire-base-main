import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { sendEmailVerification } from "firebase/auth";
import Loading from "../../components/Loading";
import "../../Style/home.css";
import Modal from "../../shared/Modal";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import ReactLoading from "react-loading";
import AllTaskSection from "./AllTaskSection";
import { useTranslation } from "react-i18next";
import Snackbar from "../../shared/Snackbar";

function Home() {
  const { t, i18n } = useTranslation();

  const [showModal, setshowModal] = useState(false);
  const [array, setArray] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [subTask, setsubTask] = useState("");
  const [spinLoading, setspinLoading] = useState(false);
  const [showMessage, setshowMessage] = useState(false);
  const [user, loading] = useAuthState(auth);

  const forgetPassword = () => {
    setshowModal(true);
  };

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div>
        <Header />

        <p className="LogOutDesc">
          Please <Link to="./signin">SignIn</Link> To Continue...{" "}
          <span>🧡</span>
        </p>
        <Footer />
      </div>
    );
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Header />
          <main>
            <div>
              {`Welcome ${user.displayName}`}
              <span>🧡</span>
            </div>
            <p></p>
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
              {i18n.language === "ar" && ""}
              {i18n.language === "en" && ""}
            </button>
          </main>
          <Footer />
        </>
      );
    }

    if (user.emailVerified) {
      return (
        <div>
          <Header />

          <main className="home">
            <div>
              {t("Welcome")} {user.displayName}
              <span>🧡</span>
            </div>

            {/* SHOW all tasks */}
            <AllTaskSection user={user} />

            {/* Add new task BTN */}
            <section className="mt">
              <button
                dir="auto"
                className="add-task-btn"
                onClick={() => {
                  forgetPassword();
                }}
              >
                {i18n.language === "ar" && " اضف مهمة جديده"}
                {i18n.language === "en" && "Add new task "}
                <i className="fa-solid fa-plus" style={{ margin: "0 5px" }}></i>
              </button>
            </section>

            {showModal && (
              <Modal
                setshowModal={setshowModal}
                setTaskTitle={setTaskTitle}
                setArray={setArray}
              >
                <div className="parent-of-modalInput">
                  <input
                    required
                    dir="auto"
                    placeholder={
                      i18n.language === "ar" ? "اضافه عنوان" : "add title"
                    }
                    type="text"
                    className="titleInput"
                    value={taskTitle}
                    onChange={(eo) => {
                      setTaskTitle(eo.target.value);
                    }}
                  />

                  <div>
                    <input
                      className="detailsInput"
                      // placeholder=" details : "
                      placeholder={
                        i18n.language === "ar" ? "التفاصيل" : "details"
                      }
                      type="text"
                      value={subTask}
                      onChange={(eo) => {
                        setsubTask(eo.target.value);
                      }}
                    />

                    <button
                      style={{
                        margin: "0 12px",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        if (!array.includes(subTask)) {
                          array.push(subTask);
                        }
                        setsubTask("");
                      }}
                    >
                      {i18n.language === "ar" && "اضافه"}
                      {i18n.language === "en" && "add"}
                    </button>
                  </div>

                  <ul className="list-of-modal">
                    {array.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <button
                  className="mtt"
                  onClick={async (eo) => {
                    eo.preventDefault();
                    setspinLoading(true);
                    const taskId = new Date().getTime();
                    await setDoc(doc(db, user.uid, `${taskId}`), {
                      id: taskId,
                      taskTitle: taskTitle,
                      taskDetails: array,
                      completed: completed,
                    });
                    setTaskTitle("");
                    setArray([]);
                    setspinLoading(false);
                    setshowModal(false);
                    setshowMessage(true);
                    setTimeout(() => {
                      setshowMessage(false);
                    }, 4000);
                  }}
                >
                  {!spinLoading ? (
                      i18n.language === "ar" ? "تسجيل" : "submit" 
                  ) : (
                    <ReactLoading
                      type={"spin"}
                      color={"white"}
                      width={20}
                      height={20}
                    />
                  )}
                </button>
              </Modal>
            )}

            <Snackbar showMessage={showMessage} />
          </main>
          <Footer />
        </div>
      );
    }
  }
}

export default Home;
