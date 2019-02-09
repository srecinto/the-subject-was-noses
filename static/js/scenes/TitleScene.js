export default class TitleScene extends Phaser.Scene {
    constructor() {
        super("Title");
        console.log("TitleScene.constructor()");
        this.titleMusic = null;
    }

    preload() {
        console.log("TitleScene.preload()");
        this.titleMusic = this.sound.add("title", { loop: true });
        this.titleBG = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "sky");
        this.titleBG = this.add.tileSprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, this.sys.game.config.width, this.sys.game.config.height, "sky");

        this.startButton = this.add.graphics();

        var add = this.add;
        var sys = this.sys;
        WebFont.load({
            custom: {
                families: [ 'Brady Bunch Remastered' ]
            },
            active: function ()
            {
                add.text(100, 200, "The Football Launch", { fontFamily: "Brady Bunch Remastered", fontSize: 80, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);

                add.text(350, 300, "Start", { fontFamily: "Brady Bunch Remastered", fontSize: 30, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
            }
        });
    }

    create () {
        console.log("TitleScene.create()");

        this.titleMusic.play();

        this.startButton = this.add.graphics();
        this.startButton.lineStyle(2, 0xffffff, 1);
        this.startButton.strokeRoundedRect(332, 290, 100, 50, 15);


    }

    update () {
        this.titleBG.tilePositionX -= 5;
    }
};