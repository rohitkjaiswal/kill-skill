import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import InterviewPrep from "./pages/InterviewPrep";
import Navbar from "./components/Navbar";
import MockInterviews from "./pages/MockInterviews";
import ShareExperienceModal from "./components/ShareExperienceModal";
import ProfilePage from "./pages/PrfilePage";
import HowItWorks from "./components/HowItWorks";

const App = () => { 
  return (
    
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/interview/:id" element={<InterviewPrep />} />
      <Route path="/mock-interviews" element={<MockInterviews />} />
      <Route path="/mock-interviews/share-experience" element={<ShareExperienceModal />} />
      <Route path="/profile" element={<ProfilePage/>} />

    </Routes>
  );
};

export default App;