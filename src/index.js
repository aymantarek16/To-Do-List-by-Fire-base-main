import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import Home from './pages/Home/Home';
import Help from './pages/Help';
import Profile from './pages/Profile';
import Errror404 from './pages/Errror404';
import EditTask from './pages/edit-task/EditTask';
import Signin from './pages/sign-in/Singin';
import Signup from './pages/sign-in/Signup';
import './i18n';
import './index.css';
import App from './pages/App';
import { Helmet, HelmetProvider } from 'react-helmet-async';


const router = createBrowserRouter([
  // Home page
  {
    path: "/",
    element: <Home />,
    errorElement: <Errror404 />,
  },
  // Edit Task page
  {
    path: "/edit-task/:stringId",
    element: <EditTask />,
  },
  // Help Page
  {
    path: "/Help",
    element: <Help />,
  },
  // Profile Page
  {
    path: "/profile",
    element: <Profile />,
  },

  // Sign in Page
  {
    path: "/signin",
    element: <Signin />,
  },

  // Sign Up Page
  {
    path: "/signup",
    element: <Signup />,
  },

]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <DataProvider>
    <HelmetProvider>

      <Helmet>
        <title>Firebase Sign</title>
      </Helmet>

      <App routerProps={router} />
    </HelmetProvider>
  </DataProvider>
);
