import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Nav";
import Hero from "./components/Hero";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Donations from "./pages/Donations";
import Details from "./pages/Details";
import Filter from "./pages/Filter";
import { AuthProvider } from "./hooks/Authcontext";
import Profile from "./pages/Profile";
import Contactus from "./pages/Contactus";
import Dashboard from "./Admin/Dashboard";
import Subscription from "./components/Subscription";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          {window.location.pathname !== "/dashboard" ? <Navbar /> : <></>}
        </div>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
          <Route exact path="/signin" element={<SignIn />}></Route>
          <Route exact path="/donations" element={<Filter />}></Route>
          <Route exact path="/details/:id" element={<Details />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route exact path="/contactus" element={<Contactus />}></Route>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>

          <Route exact path="/Subscription" element={<Subscription />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
