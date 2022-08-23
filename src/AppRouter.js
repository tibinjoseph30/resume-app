import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/admin/dashboard/Dashboard";
import Login from "./components/admin/auth/Login";
import Home from "./components/Home";
import ExperienceAdd from "./components/admin/experience/ExperienceAdd";
import ExperienceList from "./components/admin/experience/ExperienceList";

function AppRouter() {
    return(
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/experience" element={<ExperienceList/>} />
                <Route path="/add-experience" element={<ExperienceAdd/>} />
            </Routes>
        </Router>
    )
}

export default AppRouter