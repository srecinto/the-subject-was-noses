export default function makeAnimations(scene) {
    console.log("config.makeAnimation()");

    //Game Animations

    scene.anims.create({
        key: "amoeba_idle",
        frames: scene.anims.generateFrameNumbers("amoeba", { frames: [ 1, 2 ] } ),
        frameRate: 24,
        repeat: -1
    });

    scene.anims.create({
        key: "amoeba_hit",
        frames: scene.anims.generateFrameNumbers("amoeba", { frames: [ 0 ] } ),
        frameRate: 24,
        repeat: 0
    });


}