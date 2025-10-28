import React from 'react';
import './Services.css';
import webDevImage from '../imagen/Webdeveloper.png';
import databaseImage from '../imagen/Database.png';
import supportImage from '../imagen/ITSupport.png';

const servicesList = [
  {
    title: 'Web & Software Development',
    description: 'Experienced in Web Development with HTML, CSS, JavaScript, React, REST APIs, C#, .NET Framework, and Python.',
    image: webDevImage
  },
  {
    title: 'Databases & Reporting',
    description: 'Skilled in SQL Server, HANA Studio, and Crystal Reports for designing, managing, and reporting databases efficiently.',
    image: databaseImage
  },
  {
    title: 'Technical Support & Office Tools',
    description: 'Knowledgeable in computer technical support and proficient in Microsoft Office suite for professional work.',
    image: supportImage
  }
];

const Services = () => {
  return (
    <div className="services-page">
      <div className="services-container">
        <h1>My Services</h1>
        <div className="services-grid">
          {servicesList.map((service, index) => (
            <div key={index} className="service-card">
              <img src={service.image} alt={service.title} className="service-image" />
              <div className="service-info">
                <h2>{service.title}</h2>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;