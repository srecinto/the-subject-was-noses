export default class IntroScene extends Phaser.Scene {
    constructor() {
        super("Intro");
        console.log("IntroScene.constructor()");
    }

    preload() {
        console.log("IntroScene.preload()");
        this.keyPressedCounter = 0;

        this.introMusic = this.sound.add("intro", { loop: false });
        this.introImage_03 = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "intro_03");
        this.introImage_03.setDepth(1);
        this.introImage_02 = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "intro_02");
        this.introImage_02.setDepth(2);
        this.introImage_01 = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "intro_01");
        this.introImage_01.setDepth(3);
        this.introImage_prof = this.add.image(125, 462, "intro_prof");
        this.introImage_prof.setDepth(10);

        this.selectSoundFX = this.sound.add("select", { loop: false });
    }

    create () {
        console.log("IntroScene.create()");
        this.introMusic.play();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //

        this.input.keyboard.on('keyup', function (event) {
            this.clickHandler();
        }, this);

        this.input.on('pointerdown', function (pointer) {
            this.clickHandler();
        }, this);
    }

    clickHandler () {
        console.log("IntroScene.clickHandler()");
        this.selectSoundFX.play();
        this.keyPressedCounter++;
        switch(this.keyPressedCounter) {
            case 1:
                this.introImage_02.setDepth(4);
                break;
            case 2:
                this.introImage_03.setDepth(5);
                break;
            case 3:
                this.introMusic.stop();
                this.scene.start("Game");
                break;
        }
    }
};