import "./Home.css";
import Header from "./peripherals/Header";

import HomePart from "./HomePart";
import AboutUs from "./peripherals/AboutUs";
import Footer from "./peripherals/Footer";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

import InvitationHome from "./invitation/InvitationHome";
import WeddingResort from "./weddingResorts/WeddingResortsHome";
import PhotoVideoHome from "./photographer/PhotoVideoHome";
import DecoratorHome from "./decorator/DecoratorHome";
import Explore from "./explore/Explore";
import Dashboard from "./dashboard/Dashboard";
import UpdateUserInformation from "./dashboard/UpdateUserInformation";
import AddGuests from "./invitation/AddGuests";
import Templates from "./invitation/Templates";
import Cosmetologist from "./cometologist/Cosmetologist";
import TravelAgency from "./travelAgency/TravelAgency";
import AdminHome from "./adminPortal/AdminHome";
import AdminLogin from "./adminPortal/AdminLogin";

import { Routes, Route } from "react-router-dom";

function Home() {
  return (
    <div id="home">
      <Header />

      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={<HomePart />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/addGuests" element={<AddGuests />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/updateInfo" element={<UpdateUserInformation />} />
        <Route path="/invitationTemplates" element={<InvitationHome />} />
        <Route path="/weddingResorts" element={<WeddingResort />} />
        <Route path="/photoVideoHome" element={<PhotoVideoHome />} />
        <Route path="/decorators" element={<DecoratorHome />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/cosmetologist" element={<Cosmetologist />} />
        <Route path="/travelAgency" element={<TravelAgency />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminHome />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default Home;
