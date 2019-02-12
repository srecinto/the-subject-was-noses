export default class BootScene extends Phaser.Scene {
    constructor() {
        super("Boot");
        console.log("BootScene.constructor()");
    }

    preload() {
        console.log("BootScene.preload()");
        this.load.image("logo", "../assets/images/logos/tvgamejam.jpg");
    }

    create () {
        console.log("BootScene.create()");
        this.scene.start("Preloader");
    }
};