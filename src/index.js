"use strict";
module.exports = function solveSudoku(board) {
    const copyBoard = board.map(arr => [...arr]);
    recursiveSolve(copyBoard);
    return copyBoard;
};
function findEmptyPlace(board) {
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board.length; c++) {
            const value = board[r][c];
            if (value === 0) {
                const pos = {
                    row: r,
                    col: c,
                };
                return pos;
            }
        }
    }
    return null;
}
function isNumValid(num, pos, board) {
    const { row, col } = pos;
    const checkedRow = board[row];
    const checkedCol = board.map(rowArr => rowArr[col]);
    if (isNumInLine(num, checkedRow) || isNumInLine(num, checkedCol)) {
        return false;
    }
    const boardSize = board.length;
    const sectorSize = Math.sqrt(boardSize);
    const getBeginSector = setSectorSize(sectorSize);
    const sectorBeginRow = getBeginSector(row);
    const sectorBeginCol = getBeginSector(col);
    for (let r = sectorBeginRow; r < sectorBeginRow + sectorSize; r++) {
        for (let c = sectorBeginCol; c < sectorBeginCol + sectorSize; c++) {
            const value = board[r][c];
            if (value === num) {
                return false;
            }
        }
    }
    return true;
}
function recursiveSolve(board) {
    const boardSize = board.length;
    const currentPos = findEmptyPlace(board);
    if (currentPos === null) {
        return true;
    }
    for (let i = 1; i < boardSize + 1; i++) {
        const isValidNum = isNumValid(i, currentPos, board);
        if (isValidNum) {
            const { row, col } = currentPos;
            board[row][col] = i;
            if (recursiveSolve(board)) {
                return true;
            }
            board[row][col] = 0;
        }
    }
    return false;
}
function isNumInLine(num, line) {
    return line.some(value => value === num);
}
function setSectorSize(sectorSize) {
    return function (numLine) {
        return sectorSize * Math.floor(numLine / sectorSize);
    };
}
