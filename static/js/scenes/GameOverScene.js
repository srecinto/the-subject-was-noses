export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOver");
        console.log("GameOverScene.constructor()");
    }

    preload() {
        console.log("GameOverScene.preload()");
        this.keyPressed = false;
        this.gameoverMusic = this.sound.add("gameOver", { loop: false });
        this.gameoverImage = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "gameover");
        this.selectSoundFX = this.sound.add("pageTurn2", { loop: false });
    }

    create () {
        console.log("GameOverScene.create()");
        this.gameoverMusic.play();
        this.time.addEvent({ delay: 1000, callback: this.setUpAnykeyEvent, callbackScope: this, loop: false });
    }

    setUpAnykeyEvent() {
        console.log("GameOverScene.setUpAnykeyEvent()");

        this.input.keyboard.on('keyup', function (event) {
            this.clickHandler();
        }, this);

        this.input.on('pointerdown', function (pointer) {
            this.clickHandler();
        }, this);
    }

    clickHandler () {
        console.log("GameOverScene.clickHandler()");
        if(!this.keyPressed) {
            this.keyPressed = true;
            this.gameoverMusic.stop();
            this.selectSoundFX.play();
            this.scene.start("Game");
        }
    }

};7