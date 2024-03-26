import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import SignUp from "./components/Login/SignUp";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Explore from "./components/Explore/Explore";
import Invest from "./components/Invest/Invest";
import Site1 from "./components/Site1/Site1";
import Site2 from "./components/Site2/Site2";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Protected_route from "./components/Protected_route";
import Startup from "./components/Startup/Startup";
import StartupInfo from "./components/StartupInfo/StartupInfo";
import Marketplace from "./components/Marketplace/Marketplace";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout({ children }) {
  return (
    <>
      <Protected_route>
        <Navbar />
        <ToastContainer />
        <Outlet /> {/* Layout  */}

        <Footer />
      </Protected_route>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}>
              {" "}
            </Route>
            <Route path="/home" element={<Home />} />
            <Route path="/startup" element={<Startup />} />
            <Route path="/invest" element={<Invest />} />
            <Route path="/site1" element={<Site1 />} />
            <Route path="/site2" element={<Site2 />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/startup/:firebase_Id" element={<StartupInfo />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
