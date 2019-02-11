export default {
    type: Phaser.WEBGL,
    parent: "gameCanvas",
    width: 800,
    height: 600,
    pixelArt: false,
    roundPixels: false,
    title: "TV Game Jam - The Subject Of Noses",
    physics: {                              //for physics system
        default: 'matter',
        matter: {
            gravity: {
                x: 2,
                y: 3
            },
        debug: false
        }
    }
};