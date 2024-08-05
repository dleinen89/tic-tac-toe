import React, { useState } from 'react';
import { X, Circle } from 'lucide-react';
import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"


const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [winningLine, setWinningLine] = useState(null);

  const handleClick = (i) => {
    if (calculateWinner(board).winner || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const result = calculateWinner(newBoard);
    if (result.winner) {
      setWinningLine(result.line);
    }
  };

  const renderSquare = (i) => (
    <Button
    className={`w-20 h-20 text-4xl flex items-center justify-center ${
      winningLine && winningLine.includes(i) ? 'bg-green-500' : 'bg-gray-200 hover:bg-gray-300'
    }`}
    onClick={() => handleClick(i)}
  >
    {board[i] === 'X' && <X size={40} className="text-gray-800" />}
    {board[i] === 'O' && <Circle size={40} className="text-gray-800" />}
  </Button>
);

  const result = calculateWinner(board);
  let status;
  if (result.winner) {
    status = `Winner: ${result.winner === 'X' ? player1 || 'Player 1' : player2 || 'Player 2'}`;
  } else if (board.every(square => square)) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? (player1 || 'Player 1') : (player2 || 'Player 2')}`;
  }

  const handleStart = () => {
    setGameStarted(true);
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameStarted(false);
    setWinningLine(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="bg-white text-black p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mb-8 text-center">Tic Tac Toe</h1>
            {!gameStarted ? (
                <div className="flex flex-col gap-4 mb-4">
                    <Input
                    type="text"
                    placeholder="Player 1 Name"
                    value={player1}
                    onChange={(e) => setPlayer1(e.target.value)}
                    className="border-gray-300"
                    />
                    <Input
                    type="text"
                    placeholder="Player 2 Name"
                    value={player2}
                    onChange={(e) => setPlayer2(e.target.value)}
                    className="border-gray-300"
                    />
                    <Button onClick={handleStart} className="bg-gray-800 text-white hover:bg-gray-700">
                    Start Game
                    </Button>
                </div>
                ) : (
                <>
                    <div className="mb-4 text-xl font-semibold text-center">{status}</div>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => renderSquare(i))}
                    </div>
                    <Button onClick={handleRestart} className="bg-gray-800 text-white hover:bg-gray-700 w-full">
                    Restart Game
                    </Button>
                </>
                )}
        </div>
    </div>
  );
};

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return { winner: null, line: null };
}

export default TicTacToe;