import React from "react";
import { TicTacToe } from "../component/tictactoe";
import { MemoryGame} from "../component/memory";

export const Games = () => {
    return (
    <>    
        <TicTacToe/>
        <MemoryGame/>
    </>
    )
}