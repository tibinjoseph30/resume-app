import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/admin/dashboard/Dashboard";
import Login from "./components/auth/Login";
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
import ProfileView from "./components/admin/profile/ProfileView";
import ProfileEdit from "./components/admin/profile/ProfileEdit";
import AdminLayout from "./components/admin/layout/AdminLayout";
import KnowledgeAdd from "./components/admin/knowledge/KnowledgeAdd";
import KnowledgeList from "./components/admin/knowledge/KnowledgeList";
import ProjectList from "./components/admin/project/ProjectList";
import ProjectAdd from "./components/admin/project/ProjectAdd";
import ProjectEdit from "./components/admin/project/ProjectEdit";
import SocialAccountList from "./components/admin/social/SocialAccountList";
import SocialAccountAdd from "./components/admin/social/SocialAccountAdd";
import AllProjects from "./components/AllProjects";
import Resume from "./components/Resume";

function AppRouter() {
    return(
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="/all-projects" element={<AllProjects/>} />
                <Route path="/resume" element={<Resume/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/admin" element={<AdminLayout/>}>
                    <Route index path="dashboard" element={<Dashboard/>} />
                    <Route path="experience" element={<ExperienceList/>} />
                    <Route path="add-experience" element={<ExperienceAdd/>} />
                    <Route path="edit-experience/:id" element={<ExperienceEdit/>} />
                    <Route path="education" element={<EducationList/>} />
                    <Route path="add-education" element={<EducationAdd/>} />
                    <Route path="edit-education/:id" element={<EducationEdit/>} />
                    <Route path="project" element={<ProjectList/>} />
                    <Route path="add-project" element={<ProjectAdd/>} />
                    <Route path="edit-project/:id" element={<ProjectEdit/>} />
                    <Route path="skills" element={<SkillsList/>} />
                    <Route path="add-skill" element={<SkillsAdd/>} />
                    <Route path="language" element={<LanguageList/>} />
                    <Route path="add-language" element={<LanguageAdd/>} />
                    <Route path="interest" element={<InterestList/>} />
                    <Route path="add-interest" element={<InterestAdd/>} />
                    <Route path="profile" element={<ProfileView/>} />
                    <Route path="edit-profile" element={<ProfileEdit/>} />
                    <Route path="knowledge" element={<KnowledgeList/>} />
                    <Route path="add-knowledge" element={<KnowledgeAdd/>} />
                    <Route path="social-accounts" element={<SocialAccountList/>} />
                    <Route path="add-social-account" element={<SocialAccountAdd/>} />
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRouter