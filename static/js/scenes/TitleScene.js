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
        this.tvGameJamLogo = this.add.image(380, 150, "logo");
        this.tvGameJamLogo.setDisplaySize(75, 75);
        this.startButton = this.add.graphics().setInteractive();
        this.startButtonHelper = this.add.sprite(332, 290).setInteractive();
        this.startButtonHelper.setDisplaySize(100, 50);
        this.startButtonHelper.setOrigin(0);

        var scene = this;
        WebFont.load({
            custom: {
                families: [ 'Brady Bunch Remastered' ]
            },
            active: function ()
            {
                scene.add.text(100, 200, "The Football Launch", { fontFamily: "Brady Bunch Remastered", fontSize: 80, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);

                scene.startButtonText = scene.add.text(350, 300, "Start", { fontFamily: "Brady Bunch Remastered", fontSize: 30, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);

                scene.add.text(100, 350, "Art", { fontFamily: "Brady Bunch Remastered", fontSize: 30, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
                scene.add.text(100, 380, "Shoze", { fontFamily: "Brady Bunch Remastered", fontSize: 24, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);

                scene.add.text(600, 350, "Dev", { fontFamily: "Brady Bunch Remastered", fontSize: 30, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
                scene.add.text(600, 380, "Shawn Recinto", { fontFamily: "Brady Bunch Remastered", fontSize: 24, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
                scene.add.text(600, 410, "Indian Man", { fontFamily: "Brady Bunch Remastered", fontSize: 24, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);

                scene.add.text(100, 450, "UX", { fontFamily: "Brady Bunch Remastered", fontSize: 30, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
                scene.add.text(100, 480, "Shoze", { fontFamily: "Brady Bunch Remastered", fontSize: 24, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
                scene.add.text(100, 510, "Diego", { fontFamily: "Brady Bunch Remastered", fontSize: 24, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);

                scene.add.text(600, 450, "Design", { fontFamily: "Brady Bunch Remastered", fontSize: 30, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
                scene.add.text(600, 480, "Indian Man", { fontFamily: "Brady Bunch Remastered", fontSize: 24, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);

                scene.add.text(320, 400, "Music/Sound", { fontFamily: "Brady Bunch Remastered", fontSize: 30, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
                scene.add.text(320, 430, "Monika Zee", { fontFamily: "Brady Bunch Remastered", fontSize: 24, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);

            }
        });
    }

    create () {
        console.log("TitleScene.create()");

        this.titleMusic.play();

        this.startButton = this.add.graphics().setInteractive();
        this.startButton.lineStyle(2, 0xffffff, 1);
        this.startButton.strokeRoundedRect(332, 290, 100, 50, 15);

        this.input.on('pointerover', function (pointer, button){
            //console.log("over");
            this.startButton.lineStyle(2, 0xffff00, 1);
            this.startButtonText.setColor("#ffff00");
            this.startButton.strokeRoundedRect(332, 290, 100, 50, 15);
        }, this);

        this.input.on('pointerout', function (pointer, button){
            //console.log("out");
            this.startButton.lineStyle(2, 0xffffff, 1);
            this.startButtonText.setColor("#ffffff");
            this.startButton.strokeRoundedRect(332, 290, 100, 50, 15);
        }, this);

        this.input.on('pointerdown', function (pointer, button){
            if(button.length > 0) { // Not weorried about other buttons since there is only one
                console.log("clicked start");
                this.titleMusic.stop();
                this.scene.start("Intro");
            }
        }, this);
    }

    update () {
        this.titleBG.tilePositionX -= 5;
    }
};