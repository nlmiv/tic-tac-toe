function minimax(newBoard, player) {
  let availSpots = emptySquares();

  if (checkWin(newBoard, human.symbol)) {
    return {score: -10};
  } else if (checkWin(newBoard, ai.symbol)) {
    return {score: 10};
  } else if (availSpots.length === 0) {
    return {score: 0};
  }

  // extrapolate the moves available
  let moves = [];
  for (let i = 0; i <availSpots.length; i++) {
    let move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == ai.symbol) {
        let result = minimax(newBoard, human.symbol);
        move.score = result.score;
    } else {
        let result = minimax(newBoard, ai.symbol);
        move.score = result.score
    }
    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  // make decision for WIN scenario based on moves available
  let bestMove;
  if(player === ai.symbol) {
    let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
  } else {
    let bestScore = 10000;
    for(let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}
