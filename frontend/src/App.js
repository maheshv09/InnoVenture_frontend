import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./components/Login/SignUp";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Invest from "./components/Invest/Invest";
import Trend from "./components/Trends/Trends";
import Site1 from "./components/Site1/Site1";
import Site2 from "./components/Site2/Site2";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Invest />} />
          <Route path="/invest" element={<Trend />} />
          <Route path="/site1" element={<Site1 />} />
          <Route path="/site2" element={<Site2 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
