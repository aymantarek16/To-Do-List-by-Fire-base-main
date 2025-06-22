import Header from "./Header";
import Footer from "./Footer";
import "../Style/Loading.css";

const Loading = () => {
  return (
    <div>
      <Header />

      <main>
        <div className="loading"></div>
      </main>
      <Footer />
    </div>
  );
};

export default Loading;
