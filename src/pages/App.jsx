import { RouterProvider } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const App = ({ routerProps }) => {
  //  ================== useContext ================== //
  const {
    theme
  } = useContext(DataContext);
  return (
    <div className={`App ${theme}`}>
      <RouterProvider router={routerProps} />
    </div>
  )
}

export default App