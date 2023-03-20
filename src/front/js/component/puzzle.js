import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import ReactImagePuzzle from 'react-image-puzzle';
import castle from "../../img/castle.jpeg"
import character from "../../img/characters.jpeg"
import princesses from "../../img/princesas.jpg"
import "../../styles/puzzle.css"

export const PuzzleGame = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const images = [castle, character, princesses];
  
   
  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setSelectedDifficulty(null);
  };

  const Puzzle = ({ image, difficulty, onReset }) => {
    const [pieces, setPieces] = useState([]);

    // Divide la imagen en piezas y configura la matriz de piezas
    useEffect(() => {
      const numPieces = getNumPieces(difficulty);
      const pieces = splitImage(image, numPieces);
      setPieces(pieces);
    }, [image, difficulty]);

    // Función para devolver el número correcto de piezas según la dificultad
    const getNumPieces = (difficulty) => {
      switch (difficulty) {
        case 'easy':
          return 5;
        case 'medium':
          return 15;
        case 'hard':
          return 30;
        default:
          return 5;
      }
    };

    // Función para dividir la imagen en piezas
    const splitImage = (image, numPieces) => {
        // Crear un canvas para trabajar con la imagen
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
      
        // Obtener la anchura y altura de cada pieza
        const pieceWidth = Math.floor(image.width / numPieces);
        const pieceHeight = Math.floor(image.height / numPieces);
      
        // Crear un array para almacenar las piezas de la imagen
        const pieces = [];
      
        // Recorrer las filas y columnas de la imagen
        for (let y = 0; y < numPieces; y++) {
          for (let x = 0; x < numPieces; x++) {
            // Crear un canvas para la pieza actual
            const pieceCanvas = document.createElement("canvas");
            const pieceCtx = pieceCanvas.getContext("2d");
            pieceCanvas.width = pieceWidth;
            pieceCanvas.height = pieceHeight;
      
            // Copiar la sección correspondiente de la imagen en el canvas de la pieza
            const sx = x * pieceWidth;
            const sy = y * pieceHeight;
            pieceCtx.drawImage(canvas, sx, sy, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);
      
            // Almacenar la pieza en el array
            pieces.push(pieceCanvas.toDataURL());
          }
        }
      
        return pieces;
      };
      

    return (
      <div>
        {pieces.map((piece, index) => (
          <Draggable key={index}>
            <img className='puzzle-imgs' src={piece} alt={`Piece ${index}`} />
          </Draggable>
        ))}
        <ReactImagePuzzle
          src={image.src}
          level={difficulty}
          onDone={() => alert('Puzzle terminado!')}
        />
        <button className='restart-puzzle' onClick={onReset}>Comenzar de nuevo</button>
      </div>
    );
  };

  if (!selectedImage) {
    return (
      <div>
        <h1>Select an image to play:</h1>
        <div className="image-selection">

          {images.map((image) => (
            <button
              className='select-img-btn btn'
              key={image.src}
              onClick={() => handleImageSelect(image)}
            >
              <img src={image.src} alt={image.title} height="200px" width="350px"/>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!selectedDifficulty) {
    return (
      <div>
        <h1>Select a difficulty:</h1>
        <button className='diff-btn' onClick={() => handleDifficultySelect('easy')}>Fácil</button>
        <button className='diff-btn' onClick={() => handleDifficultySelect('medium')}>Medio</button>
        <button className='diff-btn' onClick={() => handleDifficultySelect('hard')}>Difícil</button>
      </div>
    );
  }

  return (
    <div>
      <Puzzle
        image={selectedImage}
        difficulty={selectedDifficulty}
        onReset={handleReset}
      />

    </div>
  );
};
