import { useState } from "react";
import './Slider.css'

const Slider = ({ slides, renderSlide }) => {
  const [sliderIndex, setSliderIndex] = useState(0);

  const next = () => {
    setSliderIndex((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    setSliderIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="slider-container">
        <button className="slider-nav prev" onClick={prev}>‹</button>

        <div
            className="slider-track"
            style={{ transform: `translateX(-${sliderIndex * 100}%)` }}
        >
            {/* Maps slider content */}
            {slides.map((content, i) => (
            <div className="slide" key={i}>
                {renderSlide(content)}
            </div>
            ))}
        </div>

        <button className="slider-nav next" onClick={next}>›</button>
    </div>
  );
};

export default Slider;
