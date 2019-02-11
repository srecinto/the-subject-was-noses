export default class OuttroScene extends Phaser.Scene {
    constructor() {
        super("Outtro");
        console.log("OuttroScene.constructor()");
    }

    preload() {
        console.log("OuttroScene.preload()");
        this.keyPressed = false;
        this.outtroMusic = this.sound.add("outtro", { loop: false });
        this.outtroImage = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "outtro");
    }

    create () {
        console.log("OuttroScene.create()");
        this.outtroMusic.play();

        this.input.keyboard.on('keyup', function (event) {
            if(!this.keyPressed) {
                this.keyPressed = true;
                this.outtroMusic.stop();
                this.scene.start("Title");
            }
        }, this);

    }

};