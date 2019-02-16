import makeAnimations from '../config/animations.js';

export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super("Preloader");
        console.log("PreloaderScene.constructor()");
        this.readyCount = 0;
    }

    preload() {
        console.log("PreloaderScene.preload()");
        var logo = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "logo"); //Show logo
        logo.setDisplaySize(480, 360); //TODO: Dont hard code
        this.initProgressBar();
        this.displayLoadingText();


        this.load.on("progress", function (value) {
            //console.log(value);

            this.progressBar.clear();
            this.progressBar.fillStyle(0xffffff, 1);
            this.progressBar.fillRect(this.progressBarX + 10, this.progressBarY+10, 300 * value, 30);
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
        }.bind(this));

        this.loadAllImages();
    }

    create () {
        console.log("PreloaderScene.create()");
        WebFont.load({
            custom: {
                families: [ 'Brady Bunch Remastered' ]
            },
            active: function ()
            {

            }
        });

        this.scene.start("Title");
    }

    loadAllImages() {
        console.log("PreloaderScene.loadAllImages()");

        this.load.spritesheet('amoeba', './assets/images/amoeba.png', { frameWidth: 68, frameHeight: 77 });
        this.load.image("foreground_brown", "./assets/images/fg.png");
        this.load.image("foreground_white", "./assets/images/fg_white.png");
        this.load.image("lace", "./assets/images/lace.png");
        this.load.image("mid_reg", "./assets/images/mid_reg.png");
        this.load.image("mid_white", "./assets/images/mid_white.png");
        this.load.image("particle", "./assets/images/particle.png");
        this.load.image("particle_01", "./assets/images/spec1.png");
        this.load.image("particle_02", "./assets/images/spec2.png");
        this.load.image("sky", "./assets/images/sky.png");
        this.load.image("spaceship", "./assets/images/spaceship.png");
        this.load.image("ui_ball", "./assets/images/ui_football.png");
        this.load.image("ui_ship", "./assets/images/ui_ship.png");
        this.load.image("ui_spec", "./assets/images/ui_spec.png");
        this.load.image("ui_meter", "./assets/images/ui_nose.png");
        this.load.image('intro_01', './assets/images/01.jpg');
        this.load.image('intro_02', './assets/images/02.jpg');
        this.load.image('intro_03', './assets/images/03.jpg');
        this.load.image('intro_prof', './assets/images/proff.png');
        this.load.image('outtro', './assets/images/end_screen_win.png');
        this.load.image('gameover', './assets/images/end_screen_fail.png');
        this.load.image('title', './assets/images/title_screen.jpg');

        this.load.audio("title", "./assets/audio/title.mp3");
        this.load.audio("intro", "./assets/audio/intro.mp3");
        this.load.audio("gameOver", "./assets/audio/gameover.mp3");
        this.load.audio("levelCompleted", "./assets/audio/levelCompleted.mp3");
        this.load.audio("main", "./assets/audio/main.mp3");

        this.load.audio("germ_huh", "./assets/audio/sound_fx/germ huh_2.wav");
        this.load.audio("germ_losing", "./assets/audio/sound_fx/germ losing_2.wav");
        this.load.audio("germ_mlem_1", "./assets/audio/sound_fx/germ mlem 1_1.wav");
        this.load.audio("germ_mlem_2", "./assets/audio/sound_fx/germ mlem 2_1.wav");
        this.load.audio("germ_mlem_3", "./assets/audio/sound_fx/germ mlem 3_1.wav");
        this.load.audio("germ_pushing_against_wind", "./assets/audio/sound_fx/germ pushing against wind 2_2.wav");
        this.load.audio("germ_pushing_against_wind_2", "./assets/audio/sound_fx/germ pushing against wind_2.wav");
        this.load.audio("germ_winning", "./assets/audio/sound_fx/germ winning_2.wav");
        this.load.audio("getting_near_the_end_1", "./assets/audio/sound_fx/getting near the end_1.wav");
        this.load.audio("select", "./assets/audio/sound_fx/select_1.wav");
        this.load.audio("wind", "./assets/audio/sound_fx/wind.wav");
        this.load.audio("pageTurn1", "./assets/audio/sound_fx/page turn 1_1.wav");
        this.load.audio("pageTurn2", "./assets/audio/sound_fx/page turn 2_1.wav");

        this.load.script("webfont", "https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js");
    }

    initProgressBar() {
        console.log("PreloaderScene.initProgressBar()");
        this.progressBarX = this.cameras.main.width / 2 - 150;
        this.progressBarY = this.cameras.main.height / 2 - 25;
        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(this.progressBarX, this.progressBarY, 320, 50);
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

};