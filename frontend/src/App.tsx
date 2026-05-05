import { BrowserRouter , Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import { Conversation } from "./pages/Conversation";
import LandingPage from "./pages/LandingPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/conversation" element={<Conversation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
