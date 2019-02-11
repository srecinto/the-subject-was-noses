export default class GameHudScene extends Phaser.Scene {

    constructor () {
        super('GameHud');
        console.log("GameHudScene.constructor()");
    }

    create () {
        console.log("GameHudScene.create()");
        this.isGameOver = false;

        this.timer = this.add.image(20, 20, "ui_meter");
        this.timer.setOrigin(0);
        this.timer.setDisplaySize(760, 90);

        this.currentTimeIcon = this.add.image(760, 35, "ui_ball_2");  //82x57
        //Start at 760px, end at 130px = 630 segments to move for a total of 10.5 segments (630px / 60 seconds)
        //this.currentTimeIcon = this.add.image(130, 35, "ui_ball_2");
        this.currentTimeIcon.setDepth(10);
        this.maxTimeLimitInSeconds = 60;
        this.previousMove = 0;
        this.deltaMove = 0;

        this.deadlineBar = this.add.graphics();
        this.deadlineBar.fillStyle(0xff0000, 1);
        this.deadlineBar.fillRoundedRect(130, 50, 4, 40, 2);

        this.timerEvent = this.time.addEvent({ delay: this.maxTimeLimitInSeconds * 1000, loop: false });

        //console.log(this);
    }

    update (time, delta) {
        if(!this.isGameOver) {
            var progress = this.timerEvent.getProgress();
            if(progress < 1) {
                // Move timer icon
                var move = (progress * 630) / 100;
                var deltaMove = (move - this.previousMove) * 100;
                //console.log("progress: " + progress + " move: " + move + " deltaMove: " + deltaMove);
                this.currentTimeIcon.setX(this.currentTimeIcon.x - deltaMove);
                this.previousMove = move;
            } else {
                console.log("Game Over");
                this.isGameOver = true;
                this.events.emit('gameOver');
            }
        }
    }

}