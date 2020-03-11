const sortByMoves = (playerA, playerB) => {
  const a = playerA.symbol
  const b = playerB.symbol

  if (a === b) {
    return 0
  }

  if (a === 'rock') {
    if (b === 'paper') { return -1 }
    return 1
  }

  if (a === 'paper') {
    if (b === 'scissors') { return -1 }
    return 1
  }

  if (a === 'scissors') {
    if (b === 'rock') { return -1 }
    return 1
  }
}

module.exports = (game, data, userId) => {
  // are we a player?
  const { players } = game

  if (!!game.winnerId || game.draw) {
    let err = new Error('This game is already finished!')
    err.status = 401
    throw err
  }

  const playerIds = players
    .map(p => p.userId)
    .map(id => id.toString())

  const imaPlayer = playerIds.includes(userId)

  if (!imaPlayer) {
    let err = new Error('You are not a player in this game!')
    err.status = 401
    throw err
  }

  if (players.length < 2) {
    let err = new Error('You can not play alone!')
    err.status = 422
    throw err
  }

  const currentPlayer = game.players
    .filter(p => p.userId.toString() === userId)[0]
  const alreadyMoved = currentPlayer && !!currentPlayer.symbol

  if (alreadyMoved) {
    let err = new Error('You already made your move!')
    err.status = 422
    throw err
  }

  // can we make a move?
  if (!data.move) {
    let err = new Error('Please tell us your move!')
    err.status = 422
    throw err
  }

  const { move } = data
  if (!['rock', 'paper', 'scissors'].includes(move)) {
    let err = new Error(`${move} is not a valid move!`)
    err.status = 422
    throw err
  }

  // make the move
  const newPlayers = game.players.map((player) => {
    if (player.userId.toString() === userId) {
      player.symbol = move
    }

    return player
  })

  // can we determine a winner after the move was made?
  const movesCount = newPlayers
    .filter(p => !!p.symbol)
    .length

  if (movesCount === newPlayers.length) {
    // we can determine a winner
    const sortedPlayers = newPlayers.sort(sortByMoves)
    const moves = sortedPlayers.map(p => p.symbol)

    // it's a draw
    if (moves[0] === moves[1]) {
      return {
        ...game,
        players: newPlayers,
        draw: true
      }
    }

    return {
      ...game,
      players: newPlayers,
      winnerId: sortedPlayers[1].userId,
      draw: false
    }
  }

  return { ...game, players: newPlayers }
}
