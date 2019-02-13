import "//cdn.jsdelivr.net/npm/phaser@3.16.2/dist/phaser.js";

import config from "./config/config.js";
import GameScene from "./scenes/GameScene.js";
import GameHudScene from "./scenes/GameHudScene.js";
import TitleScene from "./scenes/TitleScene.js";
import BootScene from "./scenes/BootScene.js";
import PreloaderScene from "./scenes/PreloaderScene.js";
import IntroScene from "./scenes/IntroScene.js";
import OuttroScene from "./scenes/OuttroScene.js";
import GameOverScene from "./scenes/GameOverScene.js";

class Game extends Phaser.Game {
    constructor () {
        super(config);
        this.scene.add("Game", GameScene);
        this.scene.add("GameHud", GameHudScene);
        this.scene.add("Title", TitleScene);
        this.scene.add("Boot", BootScene);
        this.scene.add("Preloader", PreloaderScene);
        this.scene.add("Intro", IntroScene);
        this.scene.add("Outtro", OuttroScene);
        this.scene.add("GameOver", GameOverScene);
        this.scene.start("Boot");
    }
}

window.game = new Game();