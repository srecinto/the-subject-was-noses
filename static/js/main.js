import "//cdn.jsdelivr.net/npm/phaser@3.16.1/dist/phaser.js";
import config from "/js/config/config.js";
import GameScene from "/js/scenes/GameScene.js";
import TitleScene from "/js/scenes/TitleScene.js";
import BootScene from "/js/scenes/BootScene.js";
import PreloaderScene from "/js/scenes/PreloaderScene.js";

class Game extends Phaser.Game {
    constructor () {
        super(config);
        this.scene.add("Game", GameScene);
        this.scene.add("Title", TitleScene);
        this.scene.add("Boot", BootScene);
        this.scene.add("Preloader", PreloaderScene);
        this.scene.start("Boot");
    }
}

window.game = new Game();