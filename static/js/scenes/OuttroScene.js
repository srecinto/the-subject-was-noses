export default class OuttroScene extends Phaser.Scene {
    constructor() {
        super("Outtro");
        console.log("OuttroScene.constructor()");
    }

    preload() {
        console.log("OuttroScene.preload()");
        this.keyPressed = false;
        this.outtroImage = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "outtro");
        this.selectSoundFX = this.sound.add("pageTurn1", { loop: false });
    }

    create () {
        console.log("OuttroScene.create()");

        this.input.keyboard.on('keyup', function (event) {
            this.clickHandler();
        }, this);

        this.input.on('pointerdown', function (pointer) {
            this.clickHandler();
        }, this);

    }

    clickHandler () {
        console.log("OuttroScene.clickHandler()");
        if(!this.keyPressed) {
            this.keyPressed = true;
            this.scene.get('Game').levelCompletedMusic.stop();
            this.scene.start("Title");
        }
    }

};