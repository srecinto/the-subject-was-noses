export default class OuttroScene extends Phaser.Scene {
    constructor() {
        super("Outtro");
        console.log("OuttroScene.constructor()");
    }

    preload() {
        console.log("OuttroScene.preload()");
        this.outtroMusic = this.sound.add("outtro", { loop: false });
        this.outtroImage = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "outtro");
    }

    create () {
        console.log("OuttroScene.create()");
        this.outtroMusic.play();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //

        this.time.addEvent({ delay: 3000, callback: this.pressSpacekey, callbackScope: this, loop: false });
    }

    update () {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.outtroMusic.stop();
            //this.scene.start("Game");
        }
    }

    pressSpacekey() {
        console.log("OuttroScene.pressSpacekey()");
        //Display "Press SPACE to continue"
    }
};