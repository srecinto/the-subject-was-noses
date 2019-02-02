export default {
    type: Phaser.WEBGL,
    parent: "gameCanvas",
    width: 800,
    height: 600,
    pixelArt: true,
    roundPixels: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 0
            },
            debug: true
        }
    }
};