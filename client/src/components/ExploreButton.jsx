import React from "react";

const ExploreButton = () => {
  const scrollToSection = () => {
    const section = document.getElementById("whatWeDoSection");
    if (section) {
      const targetY = section.getBoundingClientRect().top + window.scrollY;
      const startingY = window.scrollY;
      const duration = 1500; // Adjust this value to control the scroll speed

      const startTime = performance.now();

      const scroll = (currentTime) => {
        const elapsedTime = currentTime - startTime;

        window.scrollTo(
          0,
          easeInOutCubic(elapsedTime, startingY, targetY - startingY, duration)
        );

        if (elapsedTime < duration) {
          requestAnimationFrame(scroll);
        }
      };

      const easeInOutCubic = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t + b;
        t -= 2;
        return (c / 2) * (t * t * t + 2) + b;
      };

      requestAnimationFrame(scroll);
    }
  };
  return (
    <button
      onClick={scrollToSection}
      className="explore-button border border-white p-2 mt-2"
    >
      Explore More <span className="arrow">&#8595;</span>
    </button>
  );
};

export default ExploreButton;
