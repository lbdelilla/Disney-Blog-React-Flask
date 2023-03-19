import React, { useState, useEffect } from "react";
import "../../styles/memory.css";

import mickey from "../../img/mickey.png";
import donald from "../../img/donald.png";
import pluto from "../../img/pluto.png";
import daisy from "../../img/daisy.png";
import goofy from "../../img/goofy.png";
import minnie from "../../img/minnie.png";
import pattern from "../../img/pattern.png";

const BLANK_CARD = pattern;

export const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [points, setPoints] = useState(0);

  const images = [
    { id: 1, src: mickey },
    { id: 2, src: donald },
    { id: 3, src: pluto },
    { id: 4, src: daisy },
    { id: 5, src: goofy },
    { id: 6, src: minnie },
  ];

  const shuffleImages = (array) => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  useEffect(() => {
    let duplicatedImages = [...images, ...images];
    duplicatedImages = shuffleImages(duplicatedImages);
    setCards(duplicatedImages);
  }, []);

  const handleCardClick = (index) => {
    if (!solved.includes(index) && flipped.length < 2) {
      if (flipped.length === 1 && cards[index].id === cards[flipped[0]].id) {
        setSolved([...solved, flipped[0], index]);
        setFlipped([]);
        setPoints((points) => points + 2);
      } else {
        setFlipped([...flipped, index]);
        if (flipped.length === 1) {
          setTimeout(() => {
            setFlipped([]);
          }, 700);
        }
      }
    }
  };

  const isCardChosen = (index) => {
    return flipped.includes(index) || solved.includes(index);
  };

  function startOver() {
    setFlipped([]);
    setSolved([]);
    setPoints(0);
  }

  return (
    <div className="memory-game">
      <h2 className="memo-title">Juego de Memoria</h2>
      <div className="memo-game-div">
        <div className="cards-container">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`memo-card ${isCardChosen(index) ? "flipped" : ""}`}
              onClick={() => handleCardClick(index)}
            >
              <img
                src={isCardChosen(index) ? card.src : BLANK_CARD}
                alt={`card-${card.id}`}
                className="back-card"
              />
            </div>
          ))}
        </div>
        <div className="stats-btn-div">
          <h3 className="memo-points">Puntos: {points}</h3>
          {points === 12 && <p className="game-over">Juego terminado!</p>}
          <button onClick={startOver} className="start-over-btn">Nuevo Juego</button>
        </div>
      </div>
    </div>
  );
};
