export default {
    type: Phaser.WEBGL,
    parent: "gameCanvas",
    width: 800,
    height: 600,
    pixelArt: false,
    roundPixels: false,
    title: "TV Game Jam - The Subject Of Noses",
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