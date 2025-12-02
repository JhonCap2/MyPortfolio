import React from 'react';
import './Education.css';

const educationList = [
  {
    institution: 'Instituto Tecnológico de las Américas (ITLA)',
    year: '2016 - 2020',
    degree: 'Technologist in Software Development'
  },
  {
    institution: 'Politécnico de Informática Emma Balaguer',
    year: '2012 - 2016',
    degree: 'High School Diploma in Informatics'
  },
  {
    institution: 'Private Tutoring - Leonard Perez',
    year: '2014 - 2015',
    degree: 'SQL Server Training'
  }
];

const Education = () => {
  return (
    <div className="education-container page-container">
      <h1>My Education</h1>
      <div className="education-list">
        {educationList.map((edu, index) => (
          <div key={index} className="education-card">
            <h2>{edu.degree}</h2>
            <p><strong>Institution:</strong> {edu.institution}</p>
            <p><strong>Year:</strong> {edu.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
