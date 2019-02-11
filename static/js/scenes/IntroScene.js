export default class IntroScene extends Phaser.Scene {
    constructor() {
        super("Intro");
        console.log("IntroScene.constructor()");
    }

    preload() {
        console.log("IntroScene.preload()");
        this.keyPressed = false;
        this.introMusic = this.sound.add("intro", { loop: false });
        this.introImage = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "intro");
    }

    create () {
        console.log("IntroScene.create()");
        this.introMusic.play();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //

        this.input.keyboard.on('keyup', function (event) {
            if(!this.keyPressed) {
                this.keyPressed = true;
                this.introMusic.stop();
                this.scene.start("Game");
            }
        }, this);

        this.time.addEvent({ delay: 3000, callback: this.pressAnykey, callbackScope: this, loop: false });
    }

    pressAnykey() {
        console.log("IntroScene.pressAnykey()");
        //Display "Press SPACE to continue"
        //Add SPACE Input handler
    }
};