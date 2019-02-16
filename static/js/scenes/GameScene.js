export default class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");
        console.log("GameScene.constructor()");

        this.level;
        this.player;
        this.cursor;
        this.timedEvent;
        this.resetFlagEvent;
        this.air_particle;
        this.hitByParticle = false;

        this.levelSegment_01;
        this.levelSegment_02;
        this.levelSegment_03;
        this.levelSegment_04;
        this.levelSegment_05;
        this.levelSegment_06;

        this.collisionCategory;

        this.hud;

        this.playerReachedShip = false;
        this.isFlyGrunting = false;

    }

    preload() {
        console.log("GameScene.preload()");
        this.mainMusic = this.sound.add("main", { loop: true, volume: 0.7 });
        this.levelCompletedMusic = this.sound.add("levelCompleted", { loop: false });

        this.germ_huhSoundFX = this.sound.add("germ_huh", { loop: false });
        this.germ_losingSoundFX = this.sound.add("germ_losing", { loop: false });
        this.germ_pushing_against_windSoundFX = this.sound.add("germ_pushing_against_wind", { loop: false });
        this.germ_pushing_against_wind2SoundFX = this.sound.add("germ_pushing_against_wind_2", { loop: false });
        this.germ_winningSoundFX = this.sound.add("germ_winning", { loop: false });
        this.windSoundFX = this.sound.add("wind", { loop: true });

    }

    create () {
        console.log("GameScene.create()");
        this.playerReachedShip = false;
        this.scene.launch("GameHud");
        this.mainMusic.play();
        this.windSoundFX.play();
        //342 > 310 > 294
        this.back = this.add.tileSprite(12600/2,728/2,12600,728,'sky');

        this.matter.world.setBounds(0, 0, 12600, 600, 32, true, true, false, true);
        this.cameras.main.setBounds(0, 0, 12600, 600);

        /*var path = '10 294 38 310 68 342 97 342 126 310 156 294 196 294 231 310 260 342 289 342 318 310 353 294 388 294 422 310 452 342 481 342 511 310 544 294 581 294 615 310 644 342 ' +
                        '672 342 703 310 737 294 772 294 805 310 836 342 865 342 896 310 929 294 965 294 998 310 1029 342 1055 342 1085 310 1119 294 1158 294 1189 310 1221 342 1221 600 0 600 ' +
                        '';*/
        var path_01 = '30 599 57 550 107 510 170 515 202 537 220 532 259 485 300 460 350 465 385 487 410 483 450 433 480 413 520 420 570 443 590 437 625 390 670 370 720 380 740 395 767 395 767 600 0 600'
        var verts_01 = this.matter.verts.fromPath(path_01);
        var ground_01 = this.matter.add.fromVertices(605, 537, verts_01, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        ground_01.xType = "ground";
        //32 humps
        //hump1
        var path_02 = '0 50 13 50 42 19 80 2 114 2 148 19 177 50 190 50 190 600 0 600'
        var verts_02 = this.matter.verts.fromPath(path_02);
        var ground_02 = this.matter.add.fromVertices(1040, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);

        //hump2
        var ground_03 = this.matter.add.fromVertices(1230, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump3
        var ground_04 = this.matter.add.fromVertices(1420, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump4
        var ground_05 = this.matter.add.fromVertices(1610, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump5
        var ground_06 = this.matter.add.fromVertices(1800, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump6
        var ground_07 = this.matter.add.fromVertices(1990, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump7
        var ground_08 = this.matter.add.fromVertices(2180, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump8
        var ground_09 = this.matter.add.fromVertices(2370, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump9
        var ground_10 = this.matter.add.fromVertices(2553, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump10
        var ground_11 = this.matter.add.fromVertices(2743, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);

        //hump11
        var ground_12 = this.matter.add.fromVertices(2933, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump12
        var ground_13 = this.matter.add.fromVertices(3123, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump13
        var ground_14 = this.matter.add.fromVertices(3313, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump14
        var ground_15 = this.matter.add.fromVertices(3503, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump15
        var ground_16 = this.matter.add.fromVertices(3693, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump16
        var ground_17 = this.matter.add.fromVertices(3883, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump17
        var ground_18 = this.matter.add.fromVertices(4063, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump18
        var ground_19 = this.matter.add.fromVertices(4253, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump19
        var ground_20 = this.matter.add.fromVertices(4443, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump20
        var ground_21 = this.matter.add.fromVertices(4627, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);

        //hump21
        var ground_22 = this.matter.add.fromVertices(4817, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump22
        var ground_23 = this.matter.add.fromVertices(5007, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump23
        var ground_24 = this.matter.add.fromVertices(5197, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump24
        var ground_25 = this.matter.add.fromVertices(5387, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump25
        var ground_26 = this.matter.add.fromVertices(5570, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump26
        var ground_27 = this.matter.add.fromVertices(5760, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump27
        var ground_28 = this.matter.add.fromVertices(5950, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump28
        var ground_29 = this.matter.add.fromVertices(6140, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump29
        var ground_30 = this.matter.add.fromVertices(6330, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump30
        var ground_31 = this.matter.add.fromVertices(6520, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump31
        var ground_32 = this.matter.add.fromVertices(6710, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump32
        var ground_33 = this.matter.add.fromVertices(6900, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //hump33
        var ground_34 = this.matter.add.fromVertices(7080, 630, verts_02, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        //29 more humps

        for(var i = 190; i <=1330; i+=190)
        {
        this.matter.add.fromVertices(7080 + i,630, verts_02,{ ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        }
        for(var i = 190; i <=1330; i+=190)
        {
        this.matter.add.fromVertices(8400 + i,630, verts_02,{ ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        }
        for(var i = 190; i <=1330; i+=190)
        {
        this.matter.add.fromVertices(9720 + i,630, verts_02,{ ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        }
        for(var i = 190; i <=1330; i+=190)
        {
        this.matter.add.fromVertices(11040 + i,630, verts_02,{ ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        }
        this.matter.add.fromVertices(12550,630, verts_02,{ ignoreGravity: true, isStatic: true }, true, 0.01, 10);


        var path_03 = '0 135 26 135 45 80 95 27 135 9 183 0 234 9 270 27 321 80 341 135 344 147 344 454 24 454 23 406 0 406';
        var verts_03 = this.matter.verts.fromPath(path_03);

        for(var i = 0; i <= 1730; i+= 346)
        {
          this.matter.add.fromVertices(5820 + i , 498, verts_03, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        }


        //this.player = this.matter.add.sprite(7100, 50);
        this.player = this.matter.add.sprite(12400, 200);
        this.playerSprite = this.add.sprite(7100, 50, "amoeba");
        this.playerSprite.setDepth(10);
        this.player.xType = "player";
        this.player.setBody({
        type: 'polygon',
        sides: 7,
        radius: 24
        });
        this.player.setDepth(11);
        this.playerSprite.anims.play("amoeba_idle", true);

        this.spaceship = this.matter.add.sprite(170, 450, "spaceship");
        this.spaceship.setBody({
            type: 'polygon',
            sides: 5,
            radius: 120
        });
        this.spaceship.setStatic(true);
        this.spaceship.setIgnoreGravity(true);
        this.spaceship.setDisplayOrigin(170,300);
        this.spaceship.setDepth(24);
        this.spaceship.xType = "spaceship";

        this.collisionCategory = this.matter.world.nextCategory();
        this.player.setCollisionCategory(this.collisionCategory);

        this.collisionShipCategory = this.matter.world.nextCategory();
        this.spaceship.setCollisionCategory(this.collisionShipCategory);

        this.gameHud = this.scene.get('GameHud');
        this.gameHud.sys.setVisible(true);
        this.gameHud.events.on('gameOver', function () {
            this.showEndGameLoseScene();
        }, this);

        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
        //console.log("collisionstart");
        //console.log(event);
        //console.log(bodyB);
        //console.log(bodyA);
        if(bodyA.gameObject != null && bodyB.gameObject != null) {
          //console.log(bodyB);
          //console.log(bodyA);
          if(bodyB.gameObject.xType == "air_particle" && bodyA.gameObject.xType == "air_particle") {
            //console.log("HIT_B");
            bodyB.gameObject.visible = false;
            bodyB.gameObject.destroy();
            bodyA.gameObject.visible = false;
            bodyA.gameObject.destroy();
            //bodyB.destroy();
          } else if(bodyA.gameObject.xType == "air_particle" && bodyB.gameObject.xType == "player") {

            this.playerSprite.anims.play("amoeba_hit", true);
            this.germ_pushing_against_windSoundFX.stop();
            this.germ_pushing_against_wind2SoundFX.stop();
            this.germ_huhSoundFX.play();
            bodyA.gameObject.visible = false;
            bodyA.gameObject.destroy();
            this.hitByParticle = true;
            bodyB.gameObject.setVelocityX(3);
            this.resetFlagEvent = this.time.delayedCall(Phaser.Math.Between(500,1000), this.resetFlag, [], this);

          } else if(bodyB.gameObject.xType == "air_particle" && bodyA.gameObject.xType == "player") {

            this.playerSprite.anims.play("amoeba_hit", true);
            this.germ_pushing_against_windSoundFX.stop();
            this.germ_pushing_against_wind2SoundFX.stop();
            this.germ_huhSoundFX.play();
            bodyB.gameObject.visible = false;
            bodyB.gameObject.destroy();
            this.hitByParticle = true;
            bodyA.gameObject.setVelocityX(3);
            this.resetFlagEvent = this.time.delayedCall(Phaser.Math.Between(500,1000), this.resetFlag, [], this);

          } else if((bodyA.gameObject.xType == "spaceship" || bodyB.gameObject.xType == "spaceship") &&
                    (bodyA.gameObject.xType == "player" || bodyB.gameObject.xType == "player")) {
            if(!this.playerReachedShip) {
                this.playerReachedShip = true;
                this.player.setVisible(false);
                this.playerSprite.setVisible(false);
                this.mainMusic.stop();
                this.windSoundFX.stop();
                this.gameHud.playerWon = true;
                this.gameHud.getting_near_the_endSoundFX.stop();
                this.germ_winningSoundFX.play();

                console.log("ship x: " + this.spaceship.x + " y: " + this.spaceship.y + " width: " + this.spaceship.width + " height:" + this.spaceship.height);

                this.spaceshipLaunchParticles = this.add.particles('particle');
                this.spaceshipLaunchParticles.createEmitter({
                    alpha: { start: 1, end: 0 },
                    scale: { start: 0.5, end: 2.5 },
                    //tint: { start: 0xff945e, end: 0xff945e },
                    speed: 20,
                    accelerationY: 500,
                    //accelerationX: 150,
                    angle: { min: -85, max: -95 },
                    rotate: { min: -180, max: 180 },
                    lifespan: { min: 1000, max: 1100 },
                    blendMode: 'ADD',
                    frequency: 110
                });

                this.spaceshipLaunchParticles.setPosition(this.spaceship.x, this.spaceship.y + 240);

                this.gameHud.getting_near_the_endSoundFX.stop();
                this.levelCompletedMusic.play();
                this.time.addEvent({ delay: 2000, callback: this.launchShip, callbackScope: this, args: [1], loop: false });
            }
          }

        }

        }, this);

        this.cursor = this.input.keyboard.createCursorKeys();

        this.cameras.main.startFollow(this.player, true, 0.09, 0.09);  //make camera follow the player

        //TODO: re-enable when tweaking the particles
        this.timedEvent = this.time.addEvent({ delay: Phaser.Math.Between(300,2000), callback: this.onEvent, callbackScope: this});


        this.front_00 = this.add.tileSprite(200,705,800,143,'foreground_brown');
        this.front_00.setDisplayOrigin(0);
        this.front_00.scrollFactorX = .8;
        this.front_00.setDepth(50);
        this.front_00.setRotation(-0.244346)

        this.front_01 = this.add.tileSprite(1000,505,12600,143,'foreground_brown');
        this.front_01.setDisplayOrigin(0);
        this.front_01.scrollFactorX = .8;
        this.front_01.setDepth(50);
        */

        this.levelSegment_00 = this.add.tileSprite(10,600,950,300,'mid_reg');
        this.levelSegment_00.setDisplayOrigin(0);
        this.levelSegment_00.setRotation(-0.244346);
        //Full size segment example
        this.levelSegment_01 = this.add.tileSprite(945,368,11660,300,'mid_reg');                    //total 32 humps
        this.levelSegment_01.setDisplayOrigin(0);

        //Full size segment example diff Color
        this.levelSegment_03 = this.add.tileSprite(1323,368,755,300,'mid_white');
        this.levelSegment_03.setDisplayOrigin(0);

        this.levelSegment_04 = this.add.tileSprite(11513,368,755,300,'mid_white');
        this.levelSegment_04.setDisplayOrigin(0);

        this.lace_01 = this.add.tileSprite(5720,237,2100,300,'lace');                                             //3335,237,1065,300,'lace'
        this.lace_01.setDisplayOrigin(0);
    }

    update(time, delta) {
        this.back.tilePositionX -= 100;

        if(this.player.visible) {
            this.playerSprite.setX(this.player.x);
            this.playerSprite.setY(this.player.y);

            //this.front.tilePositionX = -camera.scrollX
            this.ShakeScreenEvent = this.time.delayedCall(20, this.shakeScreen, [], this);
            if(this.cursor.left.isDown && !this.hitByParticle){
                this.player.setVelocityX(-4);
                //this.front.tilePositionX -= 3.25;
            }

            if(this.cursor.right.isDown && !this.hitByParticle) {
                this.player.setVelocityX(4);
                //this.front.tilePositionX += 3.25;
            }

            if(this.cursor.up.isDown) {
                this.player.setVelocityY(-3);
                if(!this.isFlyGrunting && !this.hitByParticle) {
                    this.isFlyGrunting = true;
                    var randomGrunt = Phaser.Math.Between(0,1);

                    if(randomGrunt) {
                        this.germ_pushing_against_wind2SoundFX.play();
                    } else {
                        this.germ_pushing_against_windSoundFX.play();
                    }
                }

                if (this.player.y < 90) {
                    this.player.setVelocityY(10);
                }
            } else {
                if(this.isFlyGrunting) {
                    this.isFlyGrunting = false;
                    this.germ_pushing_against_windSoundFX.stop();
                    this.germ_pushing_against_wind2SoundFX.stop();
                }
            }
        } else {
            this.spaceshipLaunchParticles.setPosition(this.spaceship.x, this.spaceship.y  + 240);
            this.player.setPosition(this.spaceship.x, this.spaceship.y);
        }

    }

    shakeScreen (){
        var cam = this.cameras.main;
        var num1 = Math.random() * 10;
        var num2 = Math.random() * 10;
        cam.centerOn(this.player.x + num1, this.player.y + num2);
    }

    resetFlag() {
        this.playerSprite.anims.play("amoeba_idle", true);
        this.hitByParticle = false;
    }

    onEvent() {
        var air_particle = this.matter.add.sprite(this.cameras.main.scrollX ,Phaser.Math.Between(50, 550), "particle_01");
        var displayRadius = 15;//Phaser.Math.Between(7, 15);
        air_particle.xType = "air_particle";
        air_particle.setBody({
            type: 'polygon',
            sides: 7,
            radius: displayRadius
          }
        );

        air_particle.setCollisionCategory(this.collisionCategory);
        air_particle.setCollidesWith([this.collisionCategory]);
        //air_particle.setDisplaySize(displayRadius + 5, displayRadius + 5);  //Swag at matching tyhe image size to radius
        air_particle.setIgnoreGravity(true);
        air_particle.setFrictionAir(0);
        air_particle.setVelocityX(10);
        air_particle.setDepth(25);

        this.timedEvent = this.time.addEvent({ delay: Phaser.Math.Between(300,1000), callback: this.onEvent, callbackScope: this});
    }

    launchShip(velocity) {
        if (velocity >= 10) {
            console.log("Go to end game win screen");
        } else {
            this.spaceship.setStatic(false);
            this.spaceship.setIgnoreGravity(true);
            this.spaceship.setVelocityY(-10);
            //this.spaceship.setVelocityX(-5);

            this.time.addEvent({ delay: 3000, callback: this.showEndGameWinScene, callbackScope: this, loop: false });
        }
    }

    showEndGameWinScene() {
        console.log("showEndGameWinScene()");
        this.gameHud.sys.setVisible(false);
        this.scene.start("Outtro");
    }

    showEndGameLoseScene() {
        if(!this.playerReachedShip) {
            console.log("showEndGameLoseScene()");
            this.gameHud.getting_near_the_endSoundFX.stop();
            this.mainMusic.stop();
            this.windSoundFX.stop();
            this.germ_losingSoundFX.play();
            this.gameHud.sys.setVisible(false);
            this.scene.start("GameOver");
        }
    }
};
