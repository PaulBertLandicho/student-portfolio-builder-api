import React, { useState } from "react";
import "../../css/onboarding.css"; // Include specific styles

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      img: "images/intro.png",
      title: "Discover Your Portfolio Here!",
      description:
        "A platform to show your work to the world. Start now and create an amazing portfolio in just a few steps.",
    },
    {
      img: "images/intro.png",
      title: "Studies show that job applicants with a portfolio are more likely to get hired.",
      description:
        "Create personalized portfolio websites that impress potential clients & employers.",
    },
    {
      img: "images/intro.png",
      title: "Nearly 80% of recruiters prefer to see a candidate’s portfolio.",
      description:
        "Stunning online presence with portfolio’s easy-to-use interface.",
    },
    {
      img: "images/intro.png",
      title: "Expand your network & attract new opportunities.",
      description:
        "Over 60% of professionals report new leads through their portfolio websites.",
    },
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSwitchPage = () => {
    setTimeout(() => {
      window.location.href = "login";
    }, 100);
  };

  const [startX, setStartX] = useState(0);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) {
      handleNextSlide(); // Swipe left
    } else if (startX < endX - 50) {
      handlePrevSlide(); // Swipe right
    }
  };

  return (
    <div
      className="onboarding-carousel"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          className="onboarding-slide"
          key={index}
          style={{ display: index === currentSlide ? "block" : "none" }}
        >
          <img
            src={slide.img}
            alt={`Slide ${index + 1}`}
            style={{ width: "350px", margin: "50px auto" }}
          />
          <h1
            style={{
              fontWeight: "bold",
              color: "#F5511E",
              fontSize: "40px",
            }}
          >
            {slide.title}
          </h1>
          <p style={{ color: "black", fontSize: "15px", marginTop: "20px" }}>
            {slide.description}
          </p>
          {index === slides.length - 1 && (
            <button
              onClick={handleSwitchPage}
              style={{
                backgroundColor: "#F5511E",
                color: "#FFFFFF",
                fontSize: "18px",
                border: "none",
                padding: "20px 130px",
                borderRadius: "50px",
                boxShadow: "5px 5px black",
                marginTop: "20px",
              }}
            >
              Get Started
            </button>
          )}
        </div>
      ))}
      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentSlide === index ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Onboarding;
