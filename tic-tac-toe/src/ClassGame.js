import React from "react";

// class Square extends React.Component {

//     render() {
//         return <button className="square"
//             onClick={() => this.props.onClick()}>
//             {this.props.value}
//         </button>;
//     }
// yo
// }

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

class Board extends React.Component {
	renderSquare(i) {
		return (
			<Square
				key={i}
				win={this.props.winCells[i]}
				value={this.props.squares[i]}
				hl={this.props.HLCells[i]}
				onClick={() => this.props.onClick(i)}
			/>
		);
	}

	render() {
		const board = [];

		for (var i = 0; i < 3; i++) {
			var row = [];

			for (var j = 0; j < 3; j++) {
				row.push(this.renderSquare(3 * i + j));
			}

			board.push(
				<div className="board-row" key={i}>
					{row}
				</div>,
			);
		}

		return <div>{board}</div>;
	}
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [
				{
					squares: Array(9).fill(null),
				},
			],
			stepNumber: 0,
			xIsNext: true,
			winSquares: Array(9).fill(false),
			moveRev: false,
		};

		this.cordinates = [];
		this.HLcells = Array(9).fill(false);
	}

	restart() {
		this.setState({
			history: [
				{
					squares: Array(9).fill(null),
				},
			],
			stepNumber: 0,
			xIsNext: true,
			winSquares: Array(9).fill(false),
			moveRev: false,
		});
		this.cordinates = [];
	}

	handleClick(i) {
		this.HLcells.fill(false);

		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();

		if (calculateWinner(squares) || squares[i]) {
			// checks for winner and also if cell is already clicked
			return;
		}

		squares[i] = this.state.xIsNext ? "X" : "O";
		this.setState({
			history: history.concat([
				{
					// concat doesnt mutate the original array instead creates new array
					squares: squares,
				},
			]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
		});

		this.colorWinCells(squares);

		while (this.cordinates.length !== this.state.stepNumber) {
			this.cordinates.pop();
		}

		this.cordinates.push([Math.floor(i / 3), i % 3]);
	}

	jumpTo(step) {
		if (this.state.stepNumber !== step) {
			this.setState({
				stepNumber: step,
				xIsNext: step % 2 === 0, // odd number : O and even: X
				winSquares: Array(9).fill(false),
			});
		} else {
			this.setState({});
		}

		if (step !== 0) {
			// to highlight the cell
			this.HLcells.fill(false);
			const [i, j] = this.cordinates[step - 1];
			const cellnum = i * 3 + j;
			this.HLcells[cellnum] = true;
			console.log(this.HLcells);
		}
	}

	colorWinCells(squares) {
		const winner = calculateWinner(squares);

		if (winner && winner !== "Tie") {
			const cells = this.state.winSquares.slice();
			winner.winCells.forEach((i) => {
				cells[i] = true;
			});

			this.setState({
				winSquares: cells,
			});
		}
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);

		const moves = history.map((stepSate, move) => {
			const desc = move ? "Go to move #" + move : "Go to game start";
			return (
				// key important for uniquely identifying the child element by ReactDom
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>{desc}</button>
				</li>
			);
		});

		const coordinates = this.cordinates.map(([i, j], index) => {
			return (
				<li key={index}>
					<div>
						({i},{j})
					</div>
				</li>
			);
		});

		if (this.state.moveRev) {
			moves.reverse();
		}

		let status;

		if (winner) {
			status = winner === "Tie" ? "It's a tie" : "Winner: " + winner.player;
		} else {
			status = "Next player: " + (this.state.xIsNext ? "X" : "O");
		}

		return (
			<div className="game">
				<h3>Tic Tac Toe</h3>

				<div className="game-board">
					<Board
						squares={current.squares}
						onClick={(i) => this.handleClick(i)}
						winCells={this.state.winSquares}
						HLCells={this.HLcells}
					/>
					<br />
					<button onClick={() => this.restart()}>Restart</button>
				</div>

				<div className="game-info">
					<div>{status}</div>
					<ol>{moves}</ol>
					<button
						onClick={() => this.setState({ moveRev: !this.state.moveRev })}
					>
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
}

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

export default Game;

// To make board using two map function

/* {Array(3).fill(0).map((_, i) => {                   // use map fucntion
    return (
        <div className="board-row">

            {Array(3).fill(0).map((_, j) => {
                return this.renderSquare(3 * i + j)

            })}

        </div>
    )
})} */
