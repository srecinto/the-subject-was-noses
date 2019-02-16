export default class GameHudScene extends Phaser.Scene {

    constructor () {
        super('GameHud');
        console.log("GameHudScene.constructor()");
    }

    preload () {
        console.log("GameHudScene.preload()");

        this.getting_near_the_endSoundFX = this.sound.add("getting_near_the_end_1", { loop: false });
    }

    create () {
        console.log("GameHudScene.create()");
        this.playerWon = false;
        this.isNearTheEnd = false;
        this.isGameOver = false;
        this.gameScene = this.scene.get('Game');

        this.timer = this.add.image(-39, 0, "ui_meter"); //was -30 for 800x600
        this.timer.setOrigin(0);
        this.timer.setDisplaySize(1063, 90);

        this.miniMap = this.add.image(0, 648, "ui_ship");
        this.miniMap.setOrigin(0);
        this.miniMap.setDisplaySize(1024, 121);

        this.miniMe = this.add.image(1000, 713, "ui_spec");
        // Display between 100 and 940

        this.currentTimeIcon = this.add.image(980, 40, "ui_ball");  //82x57
        //Start at 980px, end at 150px = 830 segments to move for a total of 10.5 segments (630px / 60 seconds)
        //this.currentTimeIcon = this.add.image(130, 35, "ui_ball_2");
        this.currentTimeIcon.setDepth(10);
        this.maxTimeLimitInSeconds = 90;
        this.previousMove = 0;
        this.deltaMove = 0;
        /*
        this.deadlineBar = this.add.graphics();
        this.deadlineBar.fillStyle(0xff0000, 1);
        this.deadlineBar.fillRoundedRect(127, 50, 4, 40, 2);
        */
        this.timerEvent = this.time.addEvent({ delay: this.maxTimeLimitInSeconds * 1000, loop: false });


    }

    update (time, delta) {
       //console.log(this.gameScene.cameras.main.scrollX);
        if(!this.isGameOver) {
            var progress = this.timerEvent.getProgress();
            if(progress < 1) {
                // Move timer icon
                var move = (progress * 830) / 100;
                var deltaMove = (move - this.previousMove) * 100;
                //console.log("progress: " + progress + " move: " + move + " deltaMove: " + deltaMove);
                this.currentTimeIcon.setX(this.currentTimeIcon.x - deltaMove);
                this.previousMove = move;

                var timeLeft = this.maxTimeLimitInSeconds - this.timerEvent.getElapsedSeconds();

                if(timeLeft < 10 && !this.playerWon) { //Audio length for end of game warning
                    if(!this.isNearTheEnd) {
                        this.isNearTheEnd = true;
                        this.getting_near_the_endSoundFX.play();
                    }
                }

                if(this.playerWon) {
                    this.getting_near_the_endSoundFX.stop();
                }
                //Move mini me on mini map
                if(this.gameScene.cameras.main) {
                    var miniMeX = 100 + (this.gameScene.cameras.main.scrollX / 13);
                    //console.log(miniMeX);
                    this.miniMe.setX(miniMeX);
                }
            } else {
                console.log("Game Over");
                this.isGameOver = true;
                this.getting_near_the_endSoundFX.stop();
                this.events.emit('gameOver');
            }
        }
    }

}