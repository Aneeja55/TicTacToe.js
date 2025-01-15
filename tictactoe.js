const prompt= require('prompt-sync')();
let gameBoard = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
let currentPlayer= 'X';
let gameActive= true;

function printBoard(){
    console.log(`
        ${gameBoard[0]  |  gameBoard[1]  |  gameBoard[2]}
        ___________________
        ${gameBoard[3]  |  gameBoard[4]  |  gameBoard[5]}
        ___________________
        ${gameBoard[6]  |  gameBoard[7]  |  gameBoard[8]}
        `);
}

function handleMove(pos){
    if(gameBoard[pos]==' '){
        gameBoard[pos]=currentPlayer;
    }else{
        console.log("Position already Occupied!Choose another");
        return false;
    }

    if (checkWin()){
        printBoard();
        console.log(`player ${currentPlayer} wins!`);
        gameActive=false;
        return true;
    }
    
    if (gameBoard.every(cell => cell!==' ')) {
        console.log("It is a Draw!!");
        gameActive=false;
        return true;
    }

    currentPlayer= currentPlayer==="X"?"O":"X";
    return true;
}

function checkWin(){
    const conditions=[[0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]];
    return conditions.some(condition => {
        const [a,b,c]= condition;
        return gameBoard[a]===currentPlayer && gameBoard[b]===currentPlayer && gameBoard[c]===currentPlayer;
    });
}

while (gameActive){
    printBoard();
    const position=prompt(`Player ${currentPlayer}, Enter Your move(0-8): `);

    if(position>=0&&position<=8){
        handleMove(parseInt(position));
    }else{
        console.log("Invalid position, enter again");
    }
}

