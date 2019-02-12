export default class GameHudScene extends Phaser.Scene {

    constructor () {
        super('GameHud');
        console.log("GameHudScene.constructor()");
    }

    create () {
        console.log("GameHudScene.create()");
        this.isGameOver = false;
        this.gameScene = this.scene.get('Game');

        this.timer = this.add.image(-30, 0, "ui_meter");
        this.timer.setOrigin(0);
        //this.timer.setDisplaySize(760, 90);

        this.miniMap = this.add.image(0, 499, "ui_ship");
        this.miniMap.setOrigin(0);

        this.miniMe = this.add.image(740, 535, "ui_spec");
        //this.miniMe = this.add.image(100, 535, "ui_spec");

        this.currentTimeIcon = this.add.image(760, 35, "ui_ball");  //82x57
        //Start at 760px, end at 130px = 630 segments to move for a total of 10.5 segments (630px / 60 seconds)
        //this.currentTimeIcon = this.add.image(130, 35, "ui_ball_2");
        this.currentTimeIcon.setDepth(10);
        this.maxTimeLimitInSeconds = 60;
        this.previousMove = 0;
        this.deltaMove = 0;

        this.deadlineBar = this.add.graphics();
        this.deadlineBar.fillStyle(0xff0000, 1);
        this.deadlineBar.fillRoundedRect(127, 50, 4, 40, 2);

        this.timerEvent = this.time.addEvent({ delay: this.maxTimeLimitInSeconds * 1000, loop: false });


    }

    update (time, delta) {
       //console.log(this.gameScene.cameras.main.scrollX);
        if(!this.isGameOver) {
            var progress = this.timerEvent.getProgress();
            if(progress < 1) {
                // Move timer icon
                var move = (progress * 630) / 100;
                var deltaMove = (move - this.previousMove) * 100;
                //console.log("progress: " + progress + " move: " + move + " deltaMove: " + deltaMove);
                this.currentTimeIcon.setX(this.currentTimeIcon.x - deltaMove);
                this.previousMove = move;

                //Move mini me on mini map
                if(this.gameScene.cameras.main) {
                    var miniMeX = 100 + (this.gameScene.cameras.main.scrollX / 10);
                    //console.log(miniMeX);
                    this.miniMe.setX(miniMeX);
                }
            } else {
                console.log("Game Over");
                this.isGameOver = true;
                this.events.emit('gameOver');
            }
        }
    }

}