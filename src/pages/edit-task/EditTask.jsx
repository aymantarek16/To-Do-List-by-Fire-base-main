import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import Loading from "../../components/Loading";
import "../../Style/editTask.css";
import TitleSection from "./TitleSection";
import SubTaskSection from "./SubTaskSection";
import BtnsSections from "./BtnsSections";
import { useParams } from "react-router-dom";

const EditTask = () => {
  const [user, loading, error] = useAuthState(auth);
  let { stringId } = useParams();

  if (error) {
    return (
      <>
        <Header />
        <h1>Error || Not Found Page</h1>
        <Footer />
      </>
    );
  }

  if (loading) {
    return <Loading />;
  }

  if (user && user.emailVerified) {
    return (
      <div>
        <Header />
        <div className="edit-task">
          {/* Title section */}
          <TitleSection user={user} stringId={stringId} />

          {/* Sub-tasks section */}
          <SubTaskSection user={user} stringId={stringId} />

          {/* Btns section */}
          <BtnsSections user={user} stringId={stringId} />
        </div>

        <Footer />
      </div>
    );
  }
};

export default EditTask;
