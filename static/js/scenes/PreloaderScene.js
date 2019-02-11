import makeAnimations from '/js/config/animations.js';

export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super("Preloader");
        console.log("PreloaderScene.constructor()");
        this.readyCount = 0;
    }

    preload() {
        console.log("PreloaderScene.preload()");
        var logo = this.add.image(400, 300, "logo"); //Show logo
        logo.setDisplaySize(480, 360); //TODO: Dont hard code

        this.initProgressBar();
        this.displayLoadingText();

        this.load.on("progress", function (value) {
            //console.log(value);
            this.progressBar.clear();
            this.progressBar.fillStyle(0xffffff, 1);
            this.progressBar.fillRect(250, 280, 300 * value, 30);
            this.percentText.setText(parseInt(value * 100) + "%");
        }.bind(this));

        this.load.on("fileprogress", function (file) {
            //console.log(file.src);
            this.assetText.setText("Loading asset: " + file.key);
        }.bind(this));

        this.load.on("complete", function () {
            console.log("preload files complete!");
            this.progressBar.destroy();
            this.progressBox.destroy();
            this.loadingText.destroy();
            this.percentText.destroy();
            this.assetText.destroy();
            //Set up animations
            makeAnimations(this);
            this.ready();
        }.bind(this));

        this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

        this.loadAllImages();
    }

    create () {
        console.log("PreloaderScene.create()");
    }

    loadAllImages() {
        console.log("PreloaderScene.loadAllImages()");

        this.load.spritesheet('amoeba', '/assets/images/amoeba.png', { frameWidth: 68, frameHeight: 77 });
        this.load.image("foreground_brown", "/assets/images/fg.png");
        this.load.image("foreground_white", "/assets/images/fg_white.png");
        this.load.image("lace", "/assets/images/lace.png");
        this.load.image("mid_reg", "/assets/images/mid_reg.png");
        this.load.image("mid_white", "/assets/images/mid_white.png");
        this.load.image("particle", "/assets/images/particle.png");
        this.load.image("sky", "/assets/images/sky.png");
        this.load.image("spaceship", "/assets/images/spaceship.png");
        this.load.image("ui_ball_2", "/assets/images/ui_ball_2.png");
        this.load.image("ui_ball", "/assets/images/ui_ball.png");
        this.load.image("ui_meter", "/assets/images/ui_meter.png");
        this.load.image('spaceship', '/assets/images/spaceship.png');
        this.load.image('intro', '/assets/images/intro.png');
        this.load.image('outtro', '/assets/images/intro.png');
        this.load.image('gameover', '/assets/images/intro.png');

        this.load.audio("title", "/assets/audio/title.wav");
        this.load.audio("intro", "/assets/audio/intro.wav");
        this.load.audio("outtro", "/assets/audio/outtro.wav");
        this.load.audio("gameOver", "/assets/audio/gameover.wav");
        this.load.audio("levelCompleted", "/assets/audio/levelCompleted.wav");
        this.load.audio("main", "/assets/audio/main.mp3");

        this.load.script("webfont", "https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js");
    }

    initProgressBar() {
        console.log("PreloaderScene.initProgressBar()");
        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(240, 270, 320, 50);
    }

    displayLoadingText() {
        console.log("PreloaderScene.displayLoadingText()");
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        //Show Loading Text
        this.loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: "Loading...",
            style: {
                font: "20px monospace",
                fill: "#000000"
            }
        });
        this.loadingText.setOrigin(0.5, 0.5);


        this.percentText = this.make.text({
                x: width / 2,
                y: height / 2 - 5,
                text: "0%",
                style: {
                    font: "18px monospace",
                    fill: "#ffffff"
                }
            });
        this.percentText.setOrigin(0.5, 0.5);

        this.assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: "",
            style: {
                font: "18px monospace",
                fill: "#000000"
            }
        });
        this.assetText.setOrigin(0.5, 0.5);
    }

    ready() {
        console.log("PreloaderScene.ready()");
        this.readyCount++;
        if (this.readyCount === 1) { //TODO: Change to 2 to add loading delay
            this.scene.start("Title");
        }
    }
};