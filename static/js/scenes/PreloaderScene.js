//import makeAnimations from '/js/config/animations.js';

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
            //makeAnimations(this);
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
        /*
        //this.load.image("logo_bbg", "/images/ir_logo_b.png");
        this.load.image("bgCityPalette", "/images/bgCityPalette.png");
        this.load.image("bgPalette", "/images/bgPalette.png");
        this.load.image("cutscene_bottom", "/images/cutscene_bottom.png");
        this.load.image("cutscene_top", "/images/cutscene_top.png");
        this.load.image("icon", "/images/icon.png");
        this.load.image("logo_wbg", "/images/ir_logo_w.png");
        this.load.image("nutshop", "/images/nutshop.png");
        this.load.image("scorebar", "/images/scorebar.png");
        this.load.image("title_bottom", "/images/title_bottom.png");
        this.load.image("title_top", "/images/title_top.png");
        this.load.image("transition_bottom", "/images/transition_bottom.png");
        this.load.image("transition_top", "/images/transition_top.png");
        
        this.load.spritesheet("squirrel", "/images/squirrel.png", { frameWidth: 32, frameHeight: 32 });
        */
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
                fill: "#ffffff"
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
                fill: "#ffffff"
            }
        });
        this.assetText.setOrigin(0.5, 0.5);
    }
    
    ready() {
        console.log("PreloaderScene.ready()");
        this.readyCount++;
        if (this.readyCount === 2) { //TODO: Change to 2 to add loading delay
            this.scene.start("Game");
        }
    }
};