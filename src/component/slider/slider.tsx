import React, { useState } from "react";
import styles from "../../css/main.module.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Slide {
  image: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    image: "/images/slide1.jpg",
    title: "عنوان اول",
    description: "این یک توضیح کوتاه برای اسلاید اول است",
  },
  {
    image: "/images/slide2.jpg",
    title: "عنوان دوم",
    description: "این یک توضیح کوتاه برای اسلاید دوم است",
  },
  {
    image: "/images/slide3.jpg",
    title: "عنوان سوم",
    description: "این یک توضیح کوتاه برای اسلاید سوم است",
  },
];

const Slider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className={styles.slider}>
      <button className={styles.arrowLeft} onClick={prevSlide}>
        <FaChevronLeft />
      </button>

      <div className={styles.content}>
        <img src={slides[current].image} alt={slides[current].title} />
        <h2>{slides[current].title}</h2>
        <p>{slides[current].description}</p>
      </div>

      <button className={styles.arrowRight} onClick={nextSlide}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Slider;
