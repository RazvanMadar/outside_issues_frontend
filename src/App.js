import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Issues from "./pages/Issues";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AddIssuePage from "./pages/AddIssuePage";
import LoginB from "./components/bootstrap_login/LoginB";
import IssueMapOSM from "./pages/IssueMapOSM";
import Navbar3 from "./components/layout/Navbar3";
import Navbar from "./components/layout/Navbar";

function App() {
  const url = "http://localhost:8080/api/issues";
  return (
    // <NewLayout>
    // <Router> trebuie sters daca revin la <NewLayout >
    <Router>
      <Navbar3 />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issues" element={<Issues state={url} />} />
        <Route path="/add-issue" element={<AddIssuePage />} />
        <Route path="/map" element={<IssueMapOSM />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/loginB" element={<LoginB />} />
      </Routes>
    </Router>
    // </NewLayout>
  );
}

export default App;
