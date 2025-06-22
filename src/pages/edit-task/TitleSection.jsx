import React, { useRef } from "react";
import { db } from "../../firebase/config";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, updateDoc } from "firebase/firestore";
import ReactLoading from "react-loading";

const TitleSection = ({ user, stringId }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, stringId));
  const inputElement = useRef(null);

  if (error) {
    return (
      <>
        <h1>Error : {error.message}</h1>
      </>
    );
  }
  if (loading) {
    return (
      <section
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReactLoading type={"spin"} color={"white"} height={77} width={77} />
      </section>
    );
  }

  if (user) {
    return (
      <section className="title center">
        <h1>
          <input
            onChange={async (eo) => {
              await updateDoc(doc(db, user.uid, stringId), {
                taskTitle: eo.target.value,
              });
            }}
            ref={inputElement}
            defaultValue={value.data().taskTitle}
            className={`title-input center ${
              value.data().completed ? "text-through" : ""
            }`}
            type="text"
            style={{ boxShadow: "none" }}
          />
          <i
            onClick={() => {
              inputElement.current.focus();
            }}
            className="fa-regular fa-pen-to-square"
          ></i>
        </h1>
      </section>
    );
  }
};

export default TitleSection;
