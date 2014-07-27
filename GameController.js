function GameController(options)
{
	this._gameEngine = null;

	this.initialize(options);

}

GameController.prototype.initialize = function(options){
	this._gameEngine = new GameEngine();
	this._initGameListeners();
}

GameController.prototype._initGameListeners = function(){
	$(".form__button").click($.proxy(this._onButtonStartClick, this));
	
}

GameController.prototype._onButtonStartClick = function(e){
	this._gameEngine.start($( "#gridSize" ).val());
}