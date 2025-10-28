import React from 'react';
import './About.css';
import profileImage from '../imagen/jhon.png';
import resumePDF from '../document/Jhon-Adames-Resume.pdf';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-card">
          <img src={profileImage} alt="Jhon Adames portrait" className="profile-image" />
          <h1>Jhon Adames</h1>
          <p>
            I'm a passionate software developer who enjoys solving problems and helping others find effective solutions.
            I thrive in collaborative environments and am always eager to learn new technologies that improve the way we build and deliver software.
            My goal is to grow professionally while contributing to meaningful and innovative projects.
          </p>
          <a href={resumePDF} target="_blank" rel="noopener noreferrer" className="resume-link">
            📄 View My Resume
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;