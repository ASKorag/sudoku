module.exports = function solveSudoku(board) {
  const BOARD_SIZE = board.length
  const SECTOR_SIZE = Math.sqrt(BOARD_SIZE)
}

function findEmptyPlace(board) {
  board.forEach((row, rowIndex) => {
    row.forEach((num, colIndex) => {
      if (num === 0) {
        return { row: rowIndex, col: colIndex }
      }
    })
  })

  return null
}
