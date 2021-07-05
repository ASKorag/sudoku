"use strict";
module.exports = function solveSudoku(board) {
    const copyBoard = board.map(arr => [...arr]);
    recursiveSolve(copyBoard);
    return copyBoard;
};
function findEmptyPlace(board) {
    board.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            if (value === 0) {
                const obj = {
                    rowIndex,
                    colIndex,
                };
                return obj;
            }
        });
    });
    return null;
}
function checkNum(num, pos, board) {
    const { rowIndex, colIndex } = pos;
    board[rowIndex].forEach((value, index) => {
        if (value === num && index !== colIndex) {
            return false;
        }
    });
    board.forEach((row, index) => {
        const value = row[colIndex];
        if (value === num && index !== rowIndex) {
            return false;
        }
    });
    const boardSize = board.length;
    const sectorSize = Math.sqrt(boardSize);
    const sectorBeginRow = sectorSize * Math.floor(rowIndex / sectorSize);
    const sectorBeginCol = sectorSize * Math.floor(colIndex / sectorSize);
    for (let r = sectorBeginRow; r < sectorBeginRow + sectorSize; r++) {
        for (let c = sectorBeginCol; c < sectorBeginCol + sectorSize; c++) {
            if (board[r][c] === num && r !== rowIndex && c !== colIndex) {
                return false;
            }
        }
    }
    return true;
}
function recursiveSolve(board) {
    const boardSize = board.length;
    const currentPlace = findEmptyPlace(board);
    if (currentPlace === null) {
        return true;
    }
    for (let i = 1; i < boardSize + 1; i++) {
        const isValidNum = checkNum(i, currentPlace, board);
        if (isValidNum) {
            const { rowIndex, colIndex } = currentPlace;
            board[rowIndex][colIndex] = i;
            if (recursiveSolve(board)) {
                return true;
            }
            board[rowIndex][colIndex] = 0;
        }
    }
    return false;
}
