import React, { useState } from "react";
import './App.css';
import "./controlled.css";

export default function ControlledComponent() {
  const [nick, setNick] = useState("");
  const [pass, setPass] = useState("");

  const handleNickChange = (event) => {
    setNick(event.target.value);
  };

  const handlePassChange = (event) => {
    setPass(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes hacer lo que necesites con los datos
    console.log("Nick:", nick);
    console.log("Pass:", pass);
    alert(`Bienvenido ${nick}!`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nick:
        <input type="text" value={nick} onChange={handleNickChange} />
      </label>
      <p className="controlled__text">Nick: {nick}</p>

      <label>
        Pass:
        <input
          type="text"
          value={"*".repeat(pass.length)}
          onChange={handlePassChange}
        />
      </label>
      <p className="controlled__text">Pass: {"*".repeat(pass.length)}</p>

      <button type="submit">Ingresar</button>
    </form>
  );
}