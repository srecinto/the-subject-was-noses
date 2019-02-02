export default class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");
        console.log("GameScene.constructor()");
    }
     
    preload() {
        console.log("GameScene.preload()");
    }
     
    create () {
        console.log("GameScene.create()");
        
    }
};