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
    }

    preload() {
        console.log("GameScene.preload()");
        this.mainMusic = this.sound.add("main", { loop: true });
        this.levelCompletedMusic = this.sound.add("levelCompleted", { loop: false });
    }

    create () {
        console.log("GameScene.create()");
        this.mainMusic.play();
        //342 > 310 > 294
        this.back = this.add.tileSprite(7200/2,600/2,7200,600,'sky');

        this.level = this.add.image(0, 600, 'mid_reg').setOrigin(0,1);

        this.matter.world.setBounds(0, 0, 7200, 600, 32, true, true, false, true);
        this.cameras.main.setBounds(0, 0, 7200, 600);

        var path = '0 294 38 310 68 342 97 342 126 310 156 294 196 294 231 310 260 342 289 342 318 310 353 294 388 294 422 310 452 342 481 342 511 310 544 294 581 294 615 310 644 342 ' +
                '672 342 703 310 737 294 772 294 805 310 836 342 865 342 896 310 929 294 965 294 998 310 1029 342 1055 342 1085 310 1119 294 1158 294 1189 310 1221 342 1221 600 0 600 ' +
                '';

        var verts = this.matter.verts.fromPath(path);
        var ground = this.matter.add.fromVertices(620, 407, verts, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);
        ground.xType = "ground"

        this.player = this.matter.add.sprite(7100, 50);
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

        this.spaceship = this.matter.add.sprite(3880, 450, "spaceship");
        this.spaceship.setBody({
        type: 'polygon',
        sides: 5,
        radius: 50
        });
        this.spaceship.setStatic(true);
        this.spaceship.setIgnoreGravity(true);
        this.spaceship.setDisplaySize(150,150);
        this.spaceship.setDepth(15);
        this.spaceship.xType = "spaceship";

        this.collisionCategory = this.matter.world.nextCategory();
        this.player.setCollisionCategory(this.collisionCategory);

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
            bodyA.gameObject.visible = false;
            bodyA.gameObject.destroy();
            this.hitByParticle = true;
            bodyB.gameObject.setVelocityX(7);
            this.resetFlagEvent = this.time.delayedCall(2000, this.resetFlag, [], this);
          } else if(bodyB.gameObject.xType == "air_particle" && bodyA.gameObject.xType == "player") {
            this.playerSprite.anims.play("amoeba_hit", true);
            bodyB.gameObject.visible = false;
            bodyB.gameObject.destroy();
            this.hitByParticle = true;
            bodyA.gameObject.setVelocityX(7);
            this.resetFlagEvent = this.time.delayedCall(2000, this.resetFlag, [], this);
          } else if(bodyA.gameObject.xType == "spaceship" || bodyB.gameObject.xType == "spaceship") {
            this.player.setVisible(false);
            this.playerSprite.setVisible(false);
            this.mainMusic.stop();

            console.log("ship x: " + this.spaceship.x + " y: " + this.spaceship.y + " width: " + this.spaceship.width + " height:" + this.spaceship.height);

            this.spaceshipLaunchParticles = this.add.particles('particle');
            this.spaceshipLaunchParticles.createEmitter({
                alpha: { start: 1, end: 0 },
                scale: { start: 0.5, end: 2.5 },
                //tint: { start: 0xff945e, end: 0xff945e },
                speed: 20,
                accelerationY: 300,
                accelerationX: 150,
                angle: { min: -85, max: -95 },
                rotate: { min: -180, max: 180 },
                lifespan: { min: 1000, max: 1100 },
                blendMode: 'ADD',
                frequency: 110
            });

            this.spaceshipLaunchParticles.setPosition(this.spaceship.x -17, this.spaceship.y);

            this.levelCompletedMusic.play();
            this.time.addEvent({ delay: 2000, callback: this.launchShip, callbackScope: this, args: [1], loop: false });
          }

        }

        }, this);


        this.cursor = this.input.keyboard.createCursorKeys();

        this.cameras.main.startFollow(this.player, true, 0.09, 0.09);  //make camera follow the player

        //TODO: re-enable when tweaking the particles
        this.timedEvent = this.time.addEvent({ delay: Phaser.Math.Between(300,2000), callback: this.onEvent, callbackScope: this, loop: true });

        this.front = this.add.tileSprite(0,457,7200,143,'foreground_brown');
        this.front.setDisplayOrigin(0);
        this.front.scrollFactorX = .8;
        this.front.setDepth(50);

        //Full size segment example
        this.levelSegment_01 = this.add.tileSprite(6445,300,755,300,'mid_reg');
        this.levelSegment_01.setDisplayOrigin(0);
        this.levelSegment_01.setDepth(5);

        //Partial Size Segment example
        this.levelSegment_02 = this.add.tileSprite(6064,300,381,300,'mid_reg');
        this.levelSegment_02.setDisplayOrigin(0);
        this.levelSegment_02.setDepth(5);

        //Full size segment example diff Color
        this.levelSegment_03 = this.add.tileSprite(5309,300,755,300,'mid_white');
        this.levelSegment_03.setDisplayOrigin(0);
        this.levelSegment_03.setDepth(5);

        //Full size segment example
        this.levelSegment_04 = this.add.tileSprite(4554,300,755,300,'mid_reg');
        this.levelSegment_04.setDisplayOrigin(0);
        this.levelSegment_04.setDepth(5);

        //Partial size segment example curved
        this.levelSegment_05 = this.add.tileSprite(4173,394,381,300,'mid_reg');
        this.levelSegment_05.setDisplayOrigin(0);
        this.levelSegment_05.setRotation(-0.244346);
        this.levelSegment_05.setDepth(5);

        //Partial size segment example curved
        this.levelSegment_06 = this.add.tileSprite(3805,485,381,300,'mid_reg');
        this.levelSegment_06.setDisplayOrigin(0);
        this.levelSegment_06.setRotation(-0.244346);
        this.levelSegment_06.setDepth(5);
    }

    update() {
        if(this.player.visible) {
            this.playerSprite.setX(this.player.x);
            this.playerSprite.setY(this.player.y);

            this.back.tilePositionX -= 10.5;
            //this.front.tilePositionX = -camera.scrollX

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
            }
        } else {
            this.spaceshipLaunchParticles.setPosition(this.spaceship.x -17, this.spaceship.y);
            this.player.setPosition(this.spaceship.x, this.spaceship.y);
        }
    }

    resetFlag() {
        this.playerSprite.anims.play("amoeba_idle", true);
        this.hitByParticle = false;
    }

    onEvent() {
        var air_particle = this.matter.add.sprite(this.cameras.main.scrollX ,Phaser.Math.Between(50, 550), 'particle');
        var displayRadius = Phaser.Math.Between(7, 15);
        air_particle.xType = "air_particle";
        air_particle.setBody({
            type: 'polygon',
            sides: 7,
            radius: displayRadius
          }
        );

        air_particle.setCollisionCategory(this.collisionCategory);
        air_particle.setCollidesWith([this.collisionCategory]);
        air_particle.setDisplaySize(displayRadius + 5, displayRadius + 5);  //Swag at matching tyhe image size to radius
        air_particle.setIgnoreGravity(true);
        air_particle.setFrictionAir(0);
        air_particle.setVelocityX(10);
    }

    launchShip(velocity) {
        if (velocity >= 10) {
            console.log("Go to end game win screen");
        } else {
            this.spaceship.setStatic(false);
            this.spaceship.setIgnoreGravity(true);
            this.spaceship.setVelocityY(-10);
            this.spaceship.setVelocityX(-5);

            this.time.addEvent({ delay: 3000, callback: this.showEndGameWinScene, callbackScope: this, loop: false });
        }
    }

    showEndGameWinScene() {
        console.log("showEndGameWinScene()");
        this.scene.start("Outtro");
    }
};