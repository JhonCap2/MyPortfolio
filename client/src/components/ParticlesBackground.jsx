// ParticlesBackground.jsx
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await initParticlesEngine(async (engine) => {
          await loadSlim(engine);
        });
        if (mounted) setInit(true);
      } catch (err) {
        console.error("Error initializing particles:", err);
        if (mounted) setError(true);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(() => ({
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 200, duration: 0.4 },
      },
    },
    particles: {
      color: { value: "#4b66ffff" },
      links: {
        color: "#fe2d2dff",
        distance: 120,
        enable: true,
        opacity: 0.25,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        random: false,
        speed: 1.5,
        straight: false,
      },
      number: {
        density: { enable: true },
        value: 30,
      },
      opacity: { value: 0.18 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 4 } },
    },
    detectRetina: true,
  }), []);

  if (error) return null;
  return init ? (
    <div className="particles-wrapper" aria-hidden="true">
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    </div>
  ) : null;
};

export default ParticlesBackground;