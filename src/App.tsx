import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./Signup";
import Login from "./Login";
import Logout from "./logout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
