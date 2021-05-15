import { useState } from "react";

function Square(props) {
    return (
        <button
            className={props.win ? "square green" : props.hl ? "square hl" : "square"}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

function Board(props) {
    const renderSquare = (i) => {

        return (
            <Square
                key={i}
                win={props.winCells[i]}
                value={props.squares[i]}
                hl={props.HLCells[i]}
                onClick={() => props.onClick(i)}
            />
        );
    };

    const board = [];

    for (var i = 0; i < 3; i++) {
        var row = [];

        for (var j = 0; j < 3; j++) {
            row.push(renderSquare(3 * i + j));
        }

        board.push(
            <div className="board-row" key={i}>
                {row}
            </div>,
        );
    }

    return <div>{board}</div>;
}

function Game() {

    const [history, setHistory] = useState([
        {
            squares: Array(9).fill(null),
        },
    ]);

    const [stepNumber, setStepNumber] = useState(0);

    const [xIsNext, setXisNext] = useState(true);

    const [winSquares, setWinSquares] = useState(Array(9).fill(false));

    const [moveRev, setMoveRev] = useState(false);

    const [coordinatesList] = useState([])

    const [HLcells] = useState(Array(9).fill(false))




    const restart = () => {
        setHistory([{
            squares: Array(9).fill(null),
        }])
        setStepNumber(0)
        setXisNext(true)
        setWinSquares(Array(9).fill(false))
        setMoveRev(false)

        coordinatesList.length = 0
    }

    const handleClick = (i) => {

        HLcells.fill(false);

        const History = history.slice(0, stepNumber + 1);
        const current = History[History.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            // checks for winner and also if cell is already clicked
            return;
        }

        squares[i] = xIsNext ? "X" : "O";

        setHistory(History.concat([
            {
                // concat doesnt mutate the original array instead creates new array
                squares: squares,
            },
        ]))

        setStepNumber(History.length)

        setXisNext(!xIsNext)

        colorWinCells(squares);

        while (coordinatesList.length !== stepNumber) {
            coordinatesList.pop();
        }

        coordinatesList.push([Math.floor(i / 3), i % 3]);
    }


    const jumpTo = (step) => {

        if (stepNumber !== step) {
            setStepNumber(step)
            setXisNext(step % 2 === 0) // odd number : O and even: X
            setWinSquares(Array(9).fill(false))
        } else {
            setStepNumber(step)
        }

        if (step !== 0) {
            // to highlight the cell
            HLcells.fill(false);
            const [i, j] = coordinatesList[step - 1];
            const cellnum = i * 3 + j;
            HLcells[cellnum] = true;
        }


    }

    const colorWinCells = (squares) => {
        const winner = calculateWinner(squares);

        if (winner && winner !== "Tie") {
            const cells = winSquares.slice();
            winner.winCells.forEach((i) => {
                cells[i] = true;
            });

            setWinSquares(cells)
        }
    }

    // check all possible win position and see if a win has occured or not
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

        let nullCell = false;

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] == null || squares[b] == null || squares[c] == null) {
                nullCell = true;
            }

            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return {
                    player: squares[a],
                    winCells: [a, b, c],
                };
            }
        }

        return nullCell ? null : "Tie";
    }


    const History = history;
    const current = History[stepNumber];
    const winner = calculateWinner(current.squares);


    const moves = history.map((stepSate, move) => {
        const desc = move ? "Go to move #" + move : "Go to game start";
        return (
            // key important for uniquely identifying the child element by ReactDom
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    if (moveRev) {
        moves.reverse();
    }


    const coordinates = coordinatesList.map(([i, j], index) => {
        return (
            <li key={index}>
                <div>
                    ({i},{j})
					</div>
            </li>
        );
    });

    let status;

    if (winner) {
        status = winner === "Tie" ? "It's a tie" : "Winner: " + winner.player;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <div className="game">
            <h3>Tic Tac Toe</h3>

            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={handleClick}
                    winCells={winSquares}
                    HLCells={HLcells}
                />
                <br />
                <button onClick={restart}>Restart</button>
            </div>

            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
                <button onClick={() => setMoveRev(!moveRev)}>
                    Reverse the order
				</button>
            </div>

            <div>
                <div>Co-ordinates</div>
                <ol>{coordinates}</ol>
            </div>
        </div>
    );
}


export default Game