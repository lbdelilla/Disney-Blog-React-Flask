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

  // Función que mezcla el arreglo de imágenes
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
    // Duplicamos el arreglo de imágenes
    let duplicatedImages = [...images, ...images];

    // Mezclamos las imágenes
    duplicatedImages = shuffleImages(duplicatedImages);

    // Actualizamos el estado de cartas con las imágenes mezcladas
    setCards(duplicatedImages);
  }, []);

  const handleCardClick = (index) => {
    if (!solved.includes(index) && flipped.length < 2) {
      // Si la carta no está resuelta y hay menos de 2 cartas volteadas
      if (flipped.length === 1 && cards[index].id === cards[flipped[0]].id) {
        // Si hay una carta volteada y las cartas coinciden, agregamos ambas a la lista de cartas resueltas
        setSolved([...solved, flipped[0], index]);
        // Limpiamos la lista de cartas volteadas
        setFlipped([]);
        // Aumentamos los puntos
        setPoints((points) => points + 2);
      } else {
        // Si no hay una carta volteada o las cartas no coinciden, agregamos la carta volteada a la lista de cartas volteadas
        setFlipped([...flipped, index]);
        if (flipped.length === 1) {
          // Si hay una carta volteada, pero no coincide con la carta actual, ocultamos las cartas después de un tiempo
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
