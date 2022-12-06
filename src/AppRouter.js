import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/admin/dashboard/Dashboard";
import Login from "./components/admin/auth/Login";
import Home from "./components/Home";
import ExperienceAdd from "./components/admin/experience/ExperienceAdd";
import ExperienceList from "./components/admin/experience/ExperienceList";
import ExperienceEdit from "./components/admin/experience/ExperienceEdit";
import EducationList from "./components/admin/education/EducationList";
import EducationAdd from "./components/admin/education/EducationAdd";
import EducationEdit from "./components/admin/education/EducationEdit";
import SkillsList from "./components/admin/skills/SkillsList";
import SkillsAdd from "./components/admin/skills/SkillsAdd";
import LanguageList from "./components/admin/language/LanguageList";
import LanguageAdd from "./components/admin/language/LanguageAdd";
import InterestList from "./components/admin/interest/InterestList";
import InterestAdd from "./components/admin/interest/InterestAdd";

function AppRouter() {
    return(
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/experience" element={<ExperienceList/>} />
                <Route path="/add-experience" element={<ExperienceAdd/>} />
                <Route path="/edit-experience/:id" element={<ExperienceEdit/>} />
                <Route path="/education" element={<EducationList/>} />
                <Route path="/add-education" element={<EducationAdd/>} />
                <Route path="/edit-education/:id" element={<EducationEdit/>} />
                <Route path="/skills" element={<SkillsList/>} />
                <Route path="/add-skill" element={<SkillsAdd/>} />
                <Route path="/language" element={<LanguageList/>} />
                <Route path="/add-language" element={<LanguageAdd/>} />
                <Route path="/interest" element={<InterestList/>} />
                <Route path="/add-interest" element={<InterestAdd/>} />
            </Routes>
        </Router>
    )
}

export default AppRouter