const X = "X";
const O = "O";

// Return the player who has the next move
function player(board) {
  let copyBoard = [...board];
  let playerTurn = "";
  let xCount = 0;
  let oCount = 0;

  for (let square = 0; square < copyBoard.length; square++) {
    if (copyBoard[square] === X) xCount++;
    if (copyBoard[square] === O) oCount++;
  }

  xCount <= oCount ? playerTurn = X : playerTurn = O;

  return playerTurn;
}

// Return all possible actions on the board
function actions(board) {
  let copyBoard = [...board];
  let possibleActions = []

  for (let square = 0; square < copyBoard.length; square++) {
    if (copyBoard[square] === null) possibleActions.push(square);
  }

  return possibleActions;
}

// Return the resulting board from making a move i
function result(board, i) {
  let copyBoard = [...board];

  if (copyBoard[i] === null) {
    copyBoard[i] = player(copyBoard);
  }

  return copyBoard;
}

// Return the winner of the game, if there is 1
function winner(board) {
  let copyBoard = [...board];

  // Horizontal Check
  if (copyBoard[0] === X && copyBoard[1] === X && copyBoard[2] === X) return X;
  if (copyBoard[3] === X && copyBoard[4] === X && copyBoard[5] === X) return X;
  if (copyBoard[6] === X && copyBoard[7] === X && copyBoard[8] === X) return X;
  if (copyBoard[0] === O && copyBoard[1] === O && copyBoard[2] === O) return O;
  if (copyBoard[3] === O && copyBoard[4] === O && copyBoard[5] === O) return O;
  if (copyBoard[6] === O && copyBoard[7] === O && copyBoard[8] === O) return O;

  // Vertical Check
  if (copyBoard[0] === X && copyBoard[3] === X && copyBoard[6] === X) return X;
  if (copyBoard[1] === X && copyBoard[4] === X && copyBoard[7] === X) return X;
  if (copyBoard[2] === X && copyBoard[5] === X && copyBoard[8] === X) return X;
  if (copyBoard[0] === O && copyBoard[3] === O && copyBoard[6] === O) return O;
  if (copyBoard[1] === O && copyBoard[4] === O && copyBoard[7] === O) return O;
  if (copyBoard[2] === O && copyBoard[5] === O && copyBoard[8] === O) return O;

  // Diagonal Check
  if (copyBoard[0] === X && copyBoard[4] === X && copyBoard[8] === X) return X;
  if (copyBoard[2] === X && copyBoard[4] === X && copyBoard[6] === X) return X;
  if (copyBoard[0] === O && copyBoard[4] === O && copyBoard[8] === O) return O;
  if (copyBoard[2] === O && copyBoard[4] === O && copyBoard[6] === O) return O;

  return null;
}

// Check if game is over
function terminal(board) {
  let copyBoard = [...board];
  let win = winner(copyBoard);

  if (win != null) return true;

  for (let square = 0; square < copyBoard.length; square++) {
    if (copyBoard[square] === null) return false;
  }

  return true;
}

// Returns 1 if X has won the game, -1 if O won the game
function utility(board) {
  let copyBoard = [...board];
  const win = winner(copyBoard);

  if (win === X) return 1;
  if (win === O) return -1;

  return 0;
}

// Return max value of a board
function max_value(board, count) {
  let copyBoard = [...board];
  if (terminal(copyBoard)) return [utility(copyBoard), count + 1];

  let temp;
  let value = Number.NEGATIVE_INFINITY;
  const possibleActions = actions(copyBoard);

  for (let action = 0; action < possibleActions.length; action++) {
    [temp, count] = min_value(result(copyBoard, possibleActions[action]), count);
    value = Math.max(value, temp)
  }

  return [value, count + 1];
}

// Return min value of a board
function min_value(board, count) {
  let copyBoard = [...board];
  if (terminal(copyBoard)) return [utility(copyBoard), count + 1];

  let temp;
  let value = Number.POSITIVE_INFINITY;
  const possibleActions = actions(copyBoard);

  for (let action = 0; action < possibleActions.length; action++) {
    [temp, count] = max_value(result(copyBoard, possibleActions[action]), count);
    value = Math.min(value, temp);
  }

  return [value, count + 1];
}

function max_value_abp(board, alpha, beta, count) {
  let copyBoard = [...board];
  if (terminal(copyBoard)) return [utility(copyBoard), count + 1];

  let value = Number.NEGATIVE_INFINITY;
  let temp;
  const possibleActions = actions(copyBoard);

  for (let action = 0; action < possibleActions.length; action++) {
    [temp, count] = min_value_abp(result(copyBoard, possibleActions[action]), alpha, beta, count);
    value = Math.max(value, temp);
    alpha = Math.max(alpha, value);

    if (alpha > beta) break;
  }

  return [value, count + 1];
}

function min_value_abp(board, alpha, beta, count) {
  let copyBoard = [...board];
  if (terminal(copyBoard)) return [utility(copyBoard), count + 1];

  let value = Number.POSITIVE_INFINITY;
  let temp;
  const possibleActions = actions(copyBoard);

  for (let action = 0; action < possibleActions.length; action++) {
    [temp, count] = max_value_abp(result(copyBoard, possibleActions[action]), alpha, beta, count)
    value = Math.min(value, temp);
    beta = Math.min(value, beta);

    if (alpha > beta) break;
  }

  return [value, count + 1];
}

// Return the optimal action and state explored based on minimax algorithm
function optimal_move(board, alphaBetaPruning = false) {
  let copyBoard = [...board];
  const playerTurn = player(copyBoard);
  const possibleActions = actions(board);
  let statesExplored = 0;
  let tempStatesExplored;

  if (terminal(copyBoard)) return null;

  if (playerTurn === X) {
    let maxPlayerValue = Number.NEGATIVE_INFINITY;
    let maxAction, minValue;

    for (let action = 0; action < possibleActions.length; action++) {
      if (!alphaBetaPruning) {
        [minValue, tempStatesExplored] = min_value(result(copyBoard, possibleActions[action]), 0);
        statesExplored += tempStatesExplored;
      } else {
        [minValue, tempStatesExplored] = min_value_abp(result(copyBoard, possibleActions[action]), Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, 0);
        statesExplored += tempStatesExplored;
      }

      if (minValue > maxPlayerValue) {
        maxPlayerValue = minValue;
        maxAction = possibleActions[action];
      }
    }

    return [maxAction, statesExplored];
  }

  if (playerTurn === O) {
    let minPlayerValue = Number.POSITIVE_INFINITY;
    let minAction, maxValue;

    for (let action = 0; action < possibleActions.length; action++) {
      if (!alphaBetaPruning) {
        [maxValue, tempStatesExplored] = max_value(result(copyBoard, possibleActions[action]), 0);
        statesExplored += tempStatesExplored;
      } else {
        [maxValue, tempStatesExplored] = max_value_abp(result(copyBoard, possibleActions[action]), Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, 0);
        statesExplored += tempStatesExplored;
      }

      if (maxValue < minPlayerValue) {
        minPlayerValue = maxValue;
        minAction = possibleActions[action];
      }
    }

    return [minAction, statesExplored];
  }
}

export {
  player,
  actions,
  result,
  winner,
  terminal,
  utility,
  max_value,
  min_value,
  max_value_abp,
  min_value_abp,
  optimal_move,
}