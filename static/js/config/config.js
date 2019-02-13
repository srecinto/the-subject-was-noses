export default {
    type: Phaser.WEBGL,
    parent: "gameCanvas",
    width: 1024,
    height: 768,
    pixelArt: false,
    roundPixels: false,
    title: "TV Game Jam - The Subject Of Noses",
    physics: {                              //for physics system
        default: 'matter',
        matter: {
            gravity: {
                x: 1.5,
                y: 2.5
            },
        debug: true
        }
    }
};