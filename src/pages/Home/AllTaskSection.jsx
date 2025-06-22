import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";
import Moment from "react-moment";
import { useTranslation } from "react-i18next";

const AllTaskSection = ({ user }) => {
  const { t, i18n } = useTranslation();

  const [initialData, setinitialData] = useState(
    query(collection(db, user.uid), orderBy("id"))
  );

  const [value, loading, error] = useCollection(initialData);

  const [isFullopacity, setisFullopacity] = useState(false);

  const [selectValue, setselectValue] = useState("allTask");

  if (error) {
    return <h1>Error</h1>;
  }

  if (loading) {
    return (
      <section className="mttt">
        <ReactLoading type={"spin"} color={"white"} height={50} width={50} />
      </section>
    );
  }

  if (value) {
    return (
      <>
        {/* OPIONS (filtered data) */}
        <section className="parent-of-btns flex mtt">
          {selectValue === "allTask" && (
            <div className="flex">
              <button
                onClick={() => {
                  setisFullopacity(true);
                  setinitialData(
                    query(collection(db, user.uid), orderBy("id", "desc"))
                  );
                }}
                style={{
                  opacity: isFullopacity ? "1" : "0.3",
                }}
              >
                {i18n.language === "ar" && "الأحدث اولا"}
                {i18n.language === "en" && "Newest first"}
              </button>
              <button
                onClick={() => {
                  setisFullopacity(false);
                  setinitialData(
                    query(collection(db, user.uid), orderBy("id", "asc"))
                  );
                }}
                style={{
                  opacity: isFullopacity ? "0.3" : "1",
                }}
              >
                {i18n.language === "ar" && "الأقدم اولا"}
                {i18n.language === "en" && "Oldest first"}
              </button>
            </div>
          )}
          <select
            id="browsers"
            value={selectValue}
            onChange={(eo) => {
              if (eo.target.value === "allTask") {
                setisFullopacity(false);
                setinitialData(query(collection(db, user.uid), orderBy("id")));
                setselectValue("allTask");
              } else if (eo.target.value === "Completed") {
                setinitialData(
                  query(
                    collection(db, user.uid),
                    where("completed", "==", true)
                  )
                );
                setselectValue("Completed");
              } else if (eo.target.value === "notCompleted") {
                setinitialData(
                  query(
                    collection(db, user.uid),
                    where("completed", "==", false)
                  )
                );
                setselectValue("notCompleted");
              }
            }}
          >
            <option value="allTask">
              {i18n.language === "ar" && "جميع المهام"}
              {i18n.language === "en" && "All Tasks"}
            </option>
            <option value="Completed">
              {i18n.language === "ar" && "المهام المكتملة"}
              {i18n.language === "en" && "Completed"}
            </option>
            <option value="notCompleted">
              {i18n.language === "ar" && "المهام غير المكتملة"}
              {i18n.language === "en" && "Not Completed"}
            </option>
          </select>
        </section>

        <section className="flex all-tasks mt">
          {value.docs.length === 0 && (
            <h1>
              {i18n.language === "ar" && "مبروك ! لقد اكملت جميع مهامك "}
              {i18n.language === "en" && "Congratulations! You have completed Your tasks"}
              <span>🧡</span>
            </h1>
          )}

          {value.docs.map((item, index) => {
            return (
              <article dir="auto" className="one-task" key={index}>
                <Link className="task-link" to={`/edit-task/${item.data().id}`}>
                  <h2> {item.data().taskTitle} </h2>

                  <ul>
                    {item.data().taskDetails.map((item, index) => {
                      return <li key={index}> {item} </li>;
                    })}
                  </ul>

                  <p className="time">
                    <Moment fromNow date={item.data().id}/>
                  </p>
                </Link>
              </article>
            );
          })}
        </section>
      </>
    );
  }
};

export default AllTaskSection;
