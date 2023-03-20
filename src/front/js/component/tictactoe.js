import React, { useState, useEffect } from "react";
import "../../styles/tictactoe.css";
import minnieSVG from "../../img/minnie.png";
import mickeySVG from "../../img/mickey.png";

export const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("Minnie");
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    let newBoard = [...board];
    if (winner || newBoard[index]) return;
    newBoard[index] = player;
    setBoard(newBoard);
    setPlayer(player === "Minnie" ? "Mickey" : "Minnie");
    const theWinner = calculateWinner(newBoard)
    setWinner(theWinner);
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const renderCell = (index) => {
    const value = board[index];
    return (
      <div className="cell" onClick={() => handleClick(index)}>
        {value === "Minnie" ? <img width="80px" height="80px" src={minnieSVG} alt="Minnie"/> : null}
        {value === "Mickey" ? <img width="80px" height="80px" src={mickeySVG} alt="Mickey"/> : null}
      </div>
    );
  };

  const renderStatus = () => {
    if (winner) {
      if (winner === "Minnie" || winner === "Mickey") {
        return <div className="status">{winner} ganó!</div>;
      } else {
        return <div className="status">Empate!</div>;
      }
    } else {
      return <div className="status">Siguiente Jugador: {player}</div>;
    }
  };
  
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer('Minnie');
    setWinner(null);
  };

  return (
    <div className="tic-container">
      <h1 className="tic-title">Tres en linea con Minnie y Mickey</h1>
      <div className="game-and-stats">
      <div className="tic-board">
        {renderCell(0)}
        {renderCell(1)}
        {renderCell(2)}
        {renderCell(3)}
        {renderCell(4)}
        {renderCell(5)}
        {renderCell(6)}
        {renderCell(7)}
        {renderCell(8)}
      </div>
      <div className="right-div">
        {renderStatus()}
        <button className="game-restart"  onClick={resetGame}>Nuevo Juego</button>
      </div>
      </div>    
    </div>
  );
}

