export default class TitleScene extends Phaser.Scene {
    constructor() {
        super("Title");
        console.log("TitleScene.constructor()");
        this.titleMusic = null;
    }

    preload() {
        console.log("TitleScene.preload()");
        this.titleMusic = this.sound.add("title", { loop: true });
        this.selectSoundFX = this.sound.add("select", { loop: false });

        this.titleImage = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "title");

        this.startButtonHelper = this.add.sprite(303, 168).setInteractive();
        this.startButtonHelper.setSize(223, 95);
        this.startButtonHelper.setDisplaySize(223, 95);
        this.startButtonHelper.setOrigin(0);

    }

    create () {
        console.log("TitleScene.create()");

        this.titleMusic.play();

        this.input.on('pointerdown', function (pointer, button){
            if(button.length > 0) { // Not worried about other buttons since there is only one
                console.log("clicked start");
                this.selectSoundFX.play();
                this.titleMusic.stop();
                this.scene.start("Intro");
            }
        }, this);
    }

};