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
function checkNum(num, pos, board) {
    const { row, col } = pos;
    for (let c = 0; c < board.length; c++) {
        const value = board[row][c];
        if (value === num && c !== col) {
            return false;
        }
    }
    for (let r = 0; r < board.length; r++) {
        const value = board[r][col];
        if (value === num && r !== row) {
            return false;
        }
    }
    const boardSize = board.length;
    const sectorSize = Math.sqrt(boardSize);
    const sectorBeginRow = sectorSize * Math.floor(row / sectorSize);
    const sectorBeginCol = sectorSize * Math.floor(col / sectorSize);
    for (let r = sectorBeginRow; r < sectorBeginRow + sectorSize; r++) {
        for (let c = sectorBeginCol; c < sectorBeginCol + sectorSize; c++) {
            const value = board[r][c];
            if (value === num && r !== row && c !== col) {
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
        const isValidNum = checkNum(i, currentPos, board);
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
