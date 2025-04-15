import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./Carousel.css";
import { Button } from '@mui/material';

const Slider = () => {
  const slideRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleClickNext = () => {
    let items = slideRef.current.querySelectorAll(".item");
    slideRef.current.appendChild(items[0]);
  };

  const handleClickPrev = () => {
    let items = slideRef.current.querySelectorAll(".item");
    slideRef.current.prepend(items[items.length - 1]);
  };

  const data = [
    {
      id: 1,
      imgUrl: "./cro1.jpg",
      desc: "More than 20 years in the field of electronic device maintenance.",
      name: "Our experiences",
    },
    {
      id: 2,
      imgUrl:
        "./cro2.jpg",
      desc: "A specialized, highly experienced maintenance team.",
      name: "What distinguishes us?",
    },
    {
      id: 3,
      imgUrl:
        "./cro3.jpg",
      desc: "Ability to maintain various types of devices.",
      name: "Our capabilities",
    },
    {
      id: 4,
      imgUrl: "./cro3.avif",
      desc: "Free general inspection of electronic devices.",
      name: "Our free services",
    },
    {
      id: 5,
      imgUrl:
        "./cro4.jpg",
      desc: "It owns stores for electronic parts of various types.",
      name: "Our products",
    },
  ];

  
  return (
    <div className="container">
      <div className="loadbar" style={{ width: `${loadingProgress}%` }}></div>
      <div id="slide" 
      ref={slideRef}
      >
        {data.map((item) => (
          <div
            key={item.id}
            className="item"
            style={{ backgroundImage: `url(${item.imgUrl})`,borderRadius:'20px' }}
          >
            <div className="content">
              <div className="name">{item.name}</div>
              <div className="des">{item.desc}</div>
              <Button
                              component="button"

              variant="contained"
              >
                See more
                </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button id="prev" onClick={handleClickPrev}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button id="next" onClick={handleClickNext}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </div>
  );
};

export default Slider;