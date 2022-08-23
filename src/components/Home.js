import React from 'react';
import Contact from "./Contact";
import Education from "./Education";
import Experience from "./Experience";
import Header from "./Header";
import Hobbies from "./Hobbies";
import Language from "./Language";
import Profile from "./Profile";
import Skills from "./Skills";

const Home = () => {
  return (
    <div className="profile-wrapper">
        <main className="profile-container">
            <Header/>
            <div className="profile-block">
            <div className="left-block">
                <Contact/>
                <Language/>
                <Hobbies/>
            </div>
            <div className="right-block">
                <Profile/>
                <Experience/>
                <Education/>
                <Skills/>
            </div>
            </div>
        </main>
    </div>
  )
}

export default Home