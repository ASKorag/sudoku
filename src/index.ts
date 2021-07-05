type TPos = {
  rowIndex: number
  colIndex: number
}

module.exports = function solveSudoku(board: number[][]) {
  const copyBoard = board.map(arr => [...arr])

  recursiveSolve(copyBoard)

  return copyBoard
}

function findEmptyPlace(board: number[][]): TPos | null {
  board.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      if (value === 0) {
        const obj: TPos = {
          rowIndex,
          colIndex,
        }
        return obj
      }
    })
  })

  return null
}

function checkNum(num: number, pos: TPos, board: number[][]) {
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

  const boardSize = board.length
  const sectorSize = Math.sqrt(boardSize)

  const sectorBeginRow = sectorSize * Math.floor(rowIndex / sectorSize)
  const sectorBeginCol = sectorSize * Math.floor(colIndex / sectorSize)

  for (let r = sectorBeginRow; r < sectorBeginRow + sectorSize; r++) {
    for (let c = sectorBeginCol; c < sectorBeginCol + sectorSize; c++) {
      if (board[r][c] === num && r !== rowIndex && c !== colIndex) {
        return false
      }
    }
  }

  return true
}

function recursiveSolve(board: number[][]) {
  const boardSize = board.length

  const currentPlace = findEmptyPlace(board)

  if (currentPlace === null) {
    return true
  }

  for (let i = 1; i < boardSize + 1; i++) {
    const isValidNum = checkNum(i, currentPlace, board)

    if (isValidNum) {
      const { rowIndex, colIndex } = currentPlace

      board[rowIndex][colIndex] = i

      if (recursiveSolve(board)) {
        return true
      }

      board[rowIndex][colIndex] = 0
    }
  }

  return false
}
