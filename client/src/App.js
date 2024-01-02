import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import Footer from "./components/Footer";
import NotFound from "./pages/notFound";
import Aboutus from "./pages/Aboutus";
import Cookies from "js-cookie"; // Import Cookies

function App() {
  const roleId = Cookies.get("role_id");
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          {window.location.pathname !== "/dashboard" ? <Navbar /> : <></>}
        </div>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/donations" element={<Filter />} />
          <Route exact path="/details/:id" element={<Details />} />
          <Route exact path="/contactus" element={<Contactus />} />
          <Route exact path="/Subscription" element={<Subscription />} />
          <Route exact path="/aboutus" element={<Aboutus />} />
          {roleId === "1" ? (
            <Route exact path="/dashboard" element={<Dashboard />} />
          ) : (
            <Route path="*" element={<Navigate to="/signin" />} />
          )}
          <Route exact path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {window.location.pathname !== "/dashboard" ? <Footer /> : <></>}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./components/Nav";
// import Hero from "./components/Hero";
// import SignUp from "./pages/SignUp";
// import SignIn from "./pages/SignIn";
// import Home from "./pages/Home";
// import Donations from "./pages/Donations";
// import Details from "./pages/Details";
// import Filter from "./pages/Filter";
// import { AuthProvider, useAuth } from "./hooks/Authcontext"; // Import AuthProvider and useAuth
// import Profile from "./pages/Profile";
// import Contactus from "./pages/Contactus";
// import Dashboard from "./Admin/Dashboard";
// import Subscription from "./components/Subscription";
// import Footer from "./components/Footer";
// import NotFound from "./pages/notFound";
// import Aboutus from "./pages/Aboutus";

// function App() {
//   return (
//     <AuthProvider>
//       {" "}
//       {/* Wrap your entire app with AuthProvider */}
//       <AppContent />
//     </AuthProvider>
//   );
// }

// function AppContent() {
//   const { roleId } = useAuth();

//   return (
//     <BrowserRouter>
//       <div className="App">
//         {window.location.pathname !== "/dashboard" ? <Navbar /> : <></>}
//       </div>

//       <Routes>
//         <Route exact path="/" element={<Home />} />
//         <Route exact path="/signup" element={<SignUp />} />
//         <Route exact path="/signin" element={<SignIn />} />
//         <Route exact path="/donations" element={<Filter />} />
//         <Route exact path="/details/:id" element={<Details />} />
//         <Route exact path="/contactus" element={<Contactus />} />
//         <Route exact path="/Subscription" element={<Subscription />} />
//         <Route exact path="/aboutus" element={<Aboutus />} />
//         {roleId === "1" ? (
//           <Route exact path="/dashboard" element={<Dashboard />} />
//         ) : (
//           <Route path="*" element={<Navigate to="/signin" />} />
//         )}
//         <Route exact path="/profile" element={<Profile />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>

//       {window.location.pathname !== "/dashboard" ? <Footer /> : <></>}
//     </BrowserRouter>
//   );
// }

// export default App;
