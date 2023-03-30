import React, { useState } from "react";
import { TicTacToe } from "../component/tictactoe";
import { MemoryGame } from "../component/memory";

import "../../styles/games.css";

export const Games = () => {
  const [showTicTac, setShowTicTac] = useState(true);
  const [showMemory, setShowMemory] = useState(false);
  // const [showPuzzle, setShowPuzzle] = useState(false);

  const handleTicClick = () => {
    setShowTicTac(true);
    setShowMemory(false);
    // setShowPuzzle(false);
  };

  const handleMemoClick = () => {
    setShowTicTac(false);
    setShowMemory(true);
    // setShowPuzzle(false);
  };

  const handlePuzzClick = () => {
    setShowTicTac(false);
    setShowMemory(false);
    // setShowPuzzle(true);
  };

  return (
    <>
      <div className="games-div ">
        <h1 className="games-title text-center">Selecciona el juego aquí!</h1>
        <div
          className="btn-group games-btns col-4"
          role="group"
          aria-label="Basic outlined example"
        >
          <button
            type="button"
            className="btn btn-outline-light "
            onClick={handleTicClick}
          >
            Tres en linea
          </button>
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={handleMemoClick}
          >
            Memoria
          </button>
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={handlePuzzClick}
            disabled>
            Proximamente
          </button>
        </div>
      </div>
      {showTicTac ? <TicTacToe /> : null}
      {showMemory ? <MemoryGame /> : null}
      {/* {showPuzzle ? <PuzzleGame /> : null} */}
    </>
  );
};
