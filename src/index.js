module.exports = function solveSudoku(board) {
  const BOARD_SIZE = board.length
  const SECTOR_SIZE = Math.sqrt(BOARD_SIZE)
}

function findEmptyPlace(board) {
  board.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      if (value === 0) {
        return { rowIndex, colIndex }
      }
    })
  })

  return null
}

function checkNum(num, pos, board) {
  const { rowIndex, colIndex } = pos

  //-----------Check Row------------

  board[rowIndex].forEach((value, index) => {
    if (value === num && index !== colIndex) {
      return false
    }
  })

  //-----------Check Column------------

  board.forEach((row, index) => {
    const value = row[colIndex]

    if (value === num && index !== rowIndex) {
      return false
    }
  })

  //-----------Check Sector------------

  const sectorBeginRow = SECTOR_SIZE * Math.floor(rowIndex / SECTOR_SIZE)
  const sectorBeginCol = SECTOR_SIZE * Math.floor(colIndex / SECTOR_SIZE)

  for (let r = sectorBeginRow; r < sectorBeginRow + SECTOR_SIZE; r++) {
    for (let c = sectorBeginCol; c < sectorBeginCol + SECTOR_SIZE; c++) {
      if (board[r][c] === num && r !== rowIndex && c !== colIndex) {
        return false
      }
    }
  }

  return true
}
