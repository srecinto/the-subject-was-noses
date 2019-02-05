export default class CreditsScene extends Phaser.Scene {
    constructor() {
        super("Credits");
        console.log("CreditsScene.constructor()");
    }
     
    preload() {
        console.log("CreditsScene.preload()");
        this.load.image('logo', '/assets/images/logos/tvgamejam.jpg');
    }
     
    create () {
        console.log("CreditsScene.create()");
    }
};