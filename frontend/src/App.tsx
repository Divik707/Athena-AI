import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Conversation from "./pages/Conversation";

export default function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/auth" element={<Auth />}/>
          <Route path="/conversation" element={<Conversation />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

