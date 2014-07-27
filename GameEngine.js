function GameEngine(options)
{
	this._painted;
	this._content;
	this._winningCombinations;
	this._turn = 0;
	this._theBox;
	this._gridSize;
	this._squaresFilled = 0;
	this._bStarted = false;
	this.initialize();
	this.makeSelectBox();

}

GameEngine.prototype.start = function(options){
	if(this._bStarted) {
		this.reset();
	}

	this._bStarted = true;
	this._gridSize = options;
	this._setDefaults();
	this._makeGrid();
	this._winningCombinations = this._getWinningCombinations();

}

GameEngine.prototype.initialize = function(options){
	var me = this;
	$(document).on('click', ".box-item", function(e){
		var boxNumber = $(this).data("id");
		me._playerMadeMove(boxNumber);
	})
}

GameEngine.prototype.reset = function(options){
	this._bStarted = false;
	this._squaresFilled = 0;
	this._turn = 0;
	$("#box").html('');
}

GameEngine.prototype._setDefaults = function(options){
	this._painted = new Array();
    this._content = new Array();
    var gridSize = this._gridSize;
    for(var l = 1; l <= gridSize*gridSize; l++){
        this._painted[l] = false;
        this._content[l]='';
    }
	
}

GameEngine.prototype.makeSelectBox = function(options) {
	$('#gridSize').html('');
    for(i=3; i<=100; i++) {
        var selectBoxEle = "<option value='"+i+"'>"+i+"</option>";
        $("#gridSize").append(selectBoxEle);
    }
}

GameEngine.prototype._makeGrid = function(options){
    var gridSize = this._gridSize;

    for(var i=1; i<=gridSize*gridSize; i++) {
        var gridEle = "<div id='box"+i+"' data-id="+i+" class='box-item'></div>";
        $('#box').hide().append(gridEle).slideDown();
        if(i % gridSize == 0) {
            var lineBreakEle = "<br />";
            $('#box').append(lineBreakEle);
        }
    }
}

GameEngine.prototype._getWinningCombinations = function(){
	var result = [];
    var counterForRow = 1;
    var size = this._gridSize;
    
    while(counterForRow <= size*size) {
        var rows = [];
        for(var j=0; j< size; j++) {
            rows[j] = counterForRow;
            counterForRow++;
        }
        result.push(rows);
    }

    for(i=1; i<=size; i++) {
        var cols = [];
        for(var j=0; j< size; j++) {
            cols[j] = i + size*j;
        }
        result.push(cols);
    }

    var mainDiag = [];
    mainDiag[0] = 1;
    for(i=1; i<size-1; i++) {
        mainDiag[i] = size*i + i+1
    }
    mainDiag[size-1] = size*size;
    result.push(mainDiag);

    var antiDiag = [];
    antiDiag[0] = Number(size);
    for(i=1; i < size; i++) {
        antiDiag[i] = antiDiag[i-1]*1 + size*1 - 1;
    }
    result.push(antiDiag);
    return result;
}


GameEngine.prototype._playerMadeMove = function(boxNumber){
	var theBox = "box"+boxNumber;
    var targetEle = $("#"+theBox);
    var painted = this._painted;
    var content = this._content;
    var turn = this._turn;
    var gridSize = this._gridSize;

    console.log(turn);
    if(painted[boxNumber] ==false){
        if(this._turn%2==0){
            var x = "<p class='symbol'>X</p>";
            targetEle.append(x);
            content[boxNumber] = 'X';
        }

        else{
            var o = "<p class='symbol'>0</p>";
            targetEle.append(o);
            content[boxNumber] = 'O';
        }

        this._turn++;
        painted[boxNumber] = true;
        this._squaresFilled++;
        this._checkForWinners(content[boxNumber]);

        if(this._squaresFilled==gridSize*gridSize){
            alert("SORRY!! the game is over but no one won!");
            location.reload(true);
        }
    
    }
    else{
        alert("THAT SPACE IS ALREADY OCCUPIED");
    }		
}

GameEngine.prototype._checkForWinners = function(symbol){

	var arrayOfGridSize = [];
	var gridSize = this._gridSize;
	var winningCombinations = this._winningCombinations;
	var content = this._content;

    for (var i=0; i< Number(gridSize); i++) {
        arrayOfGridSize[i] = i;
    }
    var nCountsToWin = 0;
    for(var a = 0; a < winningCombinations.length; a++){
        for(var j=0; j<gridSize; j++) {
            if (arrayOfGridSize.every(function(currentElement) { 
                    return content[winningCombinations[a][currentElement]] == symbol; })) 
            {
                    nCountsToWin++;
                    
            }
        }
    }
    if(nCountsToWin == Number(gridSize)) {
        alert("Congrats "+symbol+" You WON!!!");
        this.reset();
    }
	
}