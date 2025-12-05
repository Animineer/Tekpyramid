import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home.jsx"
import About from "../components/About.jsx"
import Contact from "../components/Contact.jsx"
import Services from "../components/Services.jsx"
import App from "../App.jsx";
import FooterPage from "../FooterComponent/FooterPage.jsx";
import Footer1 from "../FooterComponent/Footer1.jsx";
import Footer2 from "../FooterComponent/Footer2.jsx";


export const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "services",
        element: <Services />,
      },
    ],
  },
  {
    path: "/footer",
    element: <FooterPage />,
    children: [
      {
        path: "footer1",
        element: <Footer1 />,
      },
      {
        path: "footer2",
        element: <Footer2 />,
      },
    ],
  },
]);