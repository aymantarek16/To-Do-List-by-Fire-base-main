import React, { useState } from "react";
import { arrayRemove, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import Moment from "react-moment";
import { useTranslation } from "react-i18next";

const SubTaskSection = ({ user, stringId }) => {
  const { t, i18n } = useTranslation();

  const [value, loading, error] = useDocument(doc(db, user.uid, stringId));
  const [showAddNewTask, setshowAddNewTask] = useState(false);
  const [subTitle, setsubTitle] = useState("");
  if (error) {
    return (
      <>
        <h1>Error | Page Not Found</h1>
      </>
    );
  }
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (user) {
    return (
      <section className="sub-task mtt">
        <div className="parent-time">
          <p className="time">
            <Moment fromNow date={value.data().id} />
          </p>
          <div>
            <input
              onChange={async (eo) => {
                if (eo.target.checked) {
                  await updateDoc(doc(db, user.uid, stringId), {
                    completed: true,
                  });
                } else {
                  await updateDoc(doc(db, user.uid, stringId), {
                    completed: false,
                  });
                }
              }}
              defaultChecked={value.data().completed}
              id="checkbox"
              type="checkbox"
              style={{ boxShadow: "none" }}
            />
            <label htmlFor="checkbox">
              {i18n.language === "ar" && "مكتمل"}
              {i18n.language === "en" && "Completed "}
            </label>
          </div>
        </div>

        <ul>
          {value.data().taskDetails.map((item, index) => {
            return (
              <li key={index} className="card-task flex">
                <p>{item}</p>
                <i
                  onClick={async () => {
                    await updateDoc(doc(db, user.uid, stringId), {
                      taskDetails: arrayRemove(item),
                    });
                  }}
                  className="fa-solid fa-trash"
                ></i>
              </li>
            );
          })}
        </ul>
        {showAddNewTask && (
          <form
            className="add-new-task flex"
            style={{ flexDirection: "row" }}
            onSubmit={(eo) => {
              eo.preventDefault();
            }}
          >
            <input
              className="add-task"
              value={subTitle}
              onChange={(eo) => {
                setsubTitle(eo.target.value);
              }}
              type="text"
            />
            <button
              className="add"
              onClick={async () => {
                setsubTitle("");
                await updateDoc(doc(db, user.uid, stringId), {
                  taskDetails: arrayUnion(subTitle),
                });
              }}
            >
              {i18n.language === "ar" && "اضافه"}
              {i18n.language === "en" && "Add"}
            </button>
            <button
              className="cancel"
              onClick={() => {
                setshowAddNewTask(false);
              }}
            >
              {i18n.language === "ar" && "الغاء"}
              {i18n.language === "en" && "Cancel"}
            </button>
          </form>
        )}

        <div className="center mttt">
          <button
            dir="auto"
            className="add-more-btn"
            onClick={() => {
              setshowAddNewTask(true);
            }}
          >
            {i18n.language === "ar" && "اضافه المزيد"}
            {i18n.language === "en" && "Add more "}
            <i className="fa-solid fa-plus" style={{margin : "0 5px"}}></i>
          </button>
        </div>
      </section>
    );
  }
};

export default SubTaskSection;
