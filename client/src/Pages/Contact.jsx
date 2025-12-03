import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css"; 

export default function Contact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    message: "",
  });

  // Estados para manejar el proceso de envío
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Maneja los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Simula el envío a una API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMessage("Sending message...");

    try {
      // Aquí iría la llamada real a tu API, por ahora la simulamos
      // await api.sendMessage(formData);
      
      // Simulación de éxito después de 2 segundos
      await new Promise(resolve => setTimeout(resolve, 2000));

      setStatusMessage("Thank you for your message! You will be redirected to the homepage.");
      
      // Espera un poco para que el usuario lea el mensaje y luego redirige
      setTimeout(() => {
        navigate("/");
      }, 2500);

    } catch (error) {
      setStatusMessage("There was an error sending your message. Please try again.");
      setIsSending(false); // Permite al usuario intentar de nuevo
      console.error("Error al enviar:", error);
    }
  };

  return (
    <div className="contact-container page-container">
      <h1>Contact Me</h1>

      {/* Contenedor que agrupa panel + formulario */}
      <div className="contact-content">
        <div className="contact-panel">
          <h2>My Contact Information</h2>
          <p>Email: jhoncap22@hotmail.com</p>
          <p>Phone: +1 (905) 439-5767</p>
          <p>Location: Canada</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send a Message</h2>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" disabled={isSending}>
            {isSending ? "Sending..." : "Send Message"}
          </button>
          {/* Muestra el mensaje de estado */}
          {statusMessage && <p className="status-message">{statusMessage}</p>}
        </form>
      </div>
    </div>
  );
}
